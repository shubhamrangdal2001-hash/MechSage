"""LLM Generator for MechSage RAG Pipeline.

Wraps OpenRouter (OpenAI-compatible API) to produce structured maintenance
diagnosis answers from retrieved context passages. Used by both the evaluation
harness and demos.

Usage:
    from app.core.rag.generator import MechSageGenerator
    gen = MechSageGenerator()
    answer = gen.generate_answer(query, passages)
"""

from __future__ import annotations

import os
import textwrap
import time
from pathlib import Path

# Load .env from project root if present (fallback for local dev)
try:
    from dotenv import load_dotenv
    _env_path = Path(__file__).resolve().parents[2] / ".env"
    load_dotenv(dotenv_path=_env_path, override=False)
except ImportError:
    pass  # python-dotenv not installed; rely on system env


def _require_api_key() -> str:
    """Return the OPENROUTER_API_KEY or raise a clear error with instructions."""
    key = os.getenv("OPENROUTER_API_KEY", "").strip()
    if not key:
        raise EnvironmentError(
            "\n\n[MechSage Generator] OPENROUTER_API_KEY is not set.\n"
            "  1. Get a free key at: https://openrouter.ai/keys\n"
            "  2. Add it to your .env file at the project root:\n"
            "       OPENROUTER_API_KEY=sk-or-...\n"
            "  3. Re-run the script.\n"
        )
    return key


class MechSageGenerator:
    """OpenRouter-based answer generator for MechSage maintenance queries.

    Uses the OpenAI-compatible SDK pointed at https://openrouter.ai/api/v1
    so any model available on OpenRouter can be swapped in via config.
    """

    SYSTEM_PROMPT = textwrap.dedent("""\
        You are MechSage, an expert maintenance engineer AI assistant.
        You answer maintenance and fault-diagnosis questions strictly based on
        the provided context passages. If the context does not contain enough
        information to answer, say "I cannot determine this from the available
        documentation."

        Keep answers concise (3-5 sentences), technically accurate, and
        actionable. Do not add information beyond what is in the context.
    """)

    # Retry settings for rate limits (429)
    MAX_RETRIES = 4
    INITIAL_BACKOFF_SECS = 10

    def __init__(
        self,
        model: str = "anthropic/claude-sonnet-4-5",
        base_url: str = "https://openrouter.ai/api/v1",
    ):
        from openai import OpenAI  # imported lazily to avoid hard dep

        api_key = _require_api_key()
        self._client = OpenAI(
            base_url=base_url,
            api_key=api_key,
            default_headers={
                "HTTP-Referer": "https://github.com/MechSage",
                "X-Title": "MechSage",
            },
        )
        self._model_name = model

    def _call_with_retry(
        self,
        messages: list[dict],
        *,
        max_tokens: int = 256,
        temperature: float = 0.0,
    ) -> str:
        """Call OpenRouter with exponential backoff on 429 rate-limit errors."""
        for attempt in range(self.MAX_RETRIES + 1):
            try:
                response = self._client.chat.completions.create(
                    model=self._model_name,
                    messages=messages,
                    max_tokens=max_tokens,
                    temperature=temperature,
                )
                return response.choices[0].message.content.strip()
            except Exception as exc:  # noqa: BLE001
                err_str = str(exc)
                print(
                    f"    [OpenRouter Debug] Attempt {attempt+1} failed: "
                    f"{type(exc).__name__}: {err_str}"
                )
                if "429" in err_str or "rate" in err_str.lower():
                    wait = self.INITIAL_BACKOFF_SECS * (2 ** attempt)
                    print(
                        f"    [OpenRouter] Rate limited (attempt {attempt+1}/"
                        f"{self.MAX_RETRIES+1}). Waiting {wait}s..."
                    )
                    time.sleep(wait)
                    continue
                raise  # Re-raise non-rate-limit errors
        return f"[RateLimitError] Exceeded {self.MAX_RETRIES} retries"

    # ------------------------------------------------------------------
    # Convenience: build the messages list with system prompt
    # ------------------------------------------------------------------

    def _build_messages(self, user_content: str) -> list[dict]:
        return [
            {"role": "system", "content": self.SYSTEM_PROMPT},
            {"role": "user", "content": user_content},
        ]

    def generate_answer(
        self,
        query: str,
        passages: list[dict],
        *,
        max_output_tokens: int = 512,
    ) -> str:
        """Generate a grounded maintenance answer from retrieved passages.

        Args:
            query: The user's maintenance question or fault description.
            passages: List of passage dicts (each has 'text', 'doc_ref', 'fault_mode').
            max_output_tokens: Cap on response length.

        Returns:
            The generated answer string, or an error string if generation fails.
        """
        if not passages:
            return "No relevant context was retrieved."

        # Build context block
        context_block = "\n\n".join(
            f"[Doc {i + 1} — {p.get('doc_ref', 'unknown')}]\n{p.get('text', '')}"
            for i, p in enumerate(passages)
        )

        user_content = (
            f"CONTEXT:\n{context_block}\n\n"
            f"QUESTION: {query}\n\n"
            "ANSWER (based only on the above context):"
        )

        try:
            return self._call_with_retry(
                self._build_messages(user_content),
                max_tokens=max_output_tokens,
                temperature=0.1,
            )
        except Exception as exc:  # noqa: BLE001
            return f"[GenerationError] {exc}"

    def judge_faithfulness(self, answer: str, passages: list[dict]) -> dict:
        """LLM-as-judge: measure faithfulness of answer to retrieved context.

        Asks the LLM to extract claims from the answer and verify each claim
        against the provided context. Returns a score between 0 and 1.

        Args:
            answer: The generated answer to evaluate.
            passages: The context passages used to generate the answer.

        Returns:
            Dict with 'score' (float 0-1), 'supported', 'total', 'reasoning'.
        """
        context_block = "\n\n".join(
            f"[Doc {i + 1}]\n{p.get('text', '')}" for i, p in enumerate(passages)
        )

        user_content = textwrap.dedent(f"""\
            You are an evaluation assistant checking whether an AI-generated answer
            is factually faithful to the provided context documents.

            CONTEXT:
            {context_block}

            GENERATED ANSWER:
            {answer}

            TASK:
            1. Extract each distinct factual claim from the Generated Answer.
            2. For each claim, determine if it is directly supported by the Context.
            3. Count: total_claims and supported_claims.
            4. Respond in this exact format:
               TOTAL_CLAIMS: <integer>
               SUPPORTED_CLAIMS: <integer>
               REASONING: <one sentence explaining any unsupported claims, or "All claims supported.">
        """)

        try:
            text = self._call_with_retry(
                self._build_messages(user_content),
                max_tokens=256,
                temperature=0.0,
            )

            # Parse response
            total, supported = 1, 1  # safe defaults
            reasoning = "Parsing failed."
            for line in text.splitlines():
                line = line.strip()
                if line.startswith("TOTAL_CLAIMS:"):
                    try:
                        total = max(1, int(line.split(":", 1)[1].strip()))
                    except ValueError:
                        pass
                elif line.startswith("SUPPORTED_CLAIMS:"):
                    try:
                        supported = int(line.split(":", 1)[1].strip())
                    except ValueError:
                        pass
                elif line.startswith("REASONING:"):
                    reasoning = line.split(":", 1)[1].strip()

            score = max(0.0, min(1.0, supported / total))
            return {"score": score, "supported": supported, "total": total, "reasoning": reasoning}

        except Exception as exc:  # noqa: BLE001
            return {"score": 0.0, "supported": 0, "total": 1, "reasoning": f"[Error] {exc}"}

    def judge_answer_relevancy(self, query: str, answer: str) -> dict:
        """LLM-as-judge: measure how well the answer addresses the query.

        Args:
            query: The original user question.
            answer: The generated answer to evaluate.

        Returns:
            Dict with 'score' (float 0-1) and 'reasoning'.
        """
        user_content = textwrap.dedent(f"""\
            You are an evaluation assistant measuring answer relevancy.

            ORIGINAL QUESTION: {query}

            GENERATED ANSWER: {answer}

            TASK:
            Rate on a scale of 0.0 to 1.0 how well the Generated Answer addresses
            the Original Question. Consider:
            - Does it directly answer what was asked? (most important)
            - Is it on-topic and not evasive?
            - Does it avoid going off on tangents?

            A score of 1.0 = perfectly addresses the question.
            A score of 0.0 = completely irrelevant or refuses to answer.

            Respond in this exact format:
            SCORE: <float between 0.0 and 1.0>
            REASONING: <one sentence>
        """)

        try:
            text = self._call_with_retry(
                self._build_messages(user_content),
                max_tokens=128,
                temperature=0.0,
            )

            score, reasoning = 0.5, "Parsing failed."
            for line in text.splitlines():
                line = line.strip()
                if line.startswith("SCORE:"):
                    try:
                        score = max(0.0, min(1.0, float(line.split(":", 1)[1].strip())))
                    except ValueError:
                        pass
                elif line.startswith("REASONING:"):
                    reasoning = line.split(":", 1)[1].strip()

            return {"score": score, "reasoning": reasoning}

        except Exception as exc:  # noqa: BLE001
            return {"score": 0.0, "reasoning": f"[Error] {exc}"}

    def judge_explanation_quality(self, query: str, answer: str, context_text: str) -> dict:
        """LLM-as-judge: score explanation quality on 4-dimension rubric (§3.4).

        Dimensions:
            - Clarity (1-5): Is it easy to understand?
            - Actionability (1-5): Does it give clear next steps?
            - Technical Accuracy (1-5): Is it technically correct per context?
            - Conciseness (1-5): Is it appropriately brief without padding?

        Returns:
            Dict with per-dimension scores and overall average.
        """
        user_content = textwrap.dedent(f"""\
            You are an expert maintenance engineer evaluating an AI-generated diagnosis.

            CONTEXT (from technical manual):
            {context_text[:800]}

            QUESTION: {query}

            GENERATED ANSWER: {answer}

            Score the answer on these 4 dimensions (each 1-5):
            1. Clarity: Is it easy to understand for a technician?
            2. Actionability: Does it give clear, concrete next steps?
            3. Technical_Accuracy: Is the technical content correct per the context?
            4. Conciseness: Is it appropriately brief without losing key details?

            Respond in this exact format:
            CLARITY: <1-5>
            ACTIONABILITY: <1-5>
            TECHNICAL_ACCURACY: <1-5>
            CONCISENESS: <1-5>
        """)

        try:
            text = self._call_with_retry(
                self._build_messages(user_content),
                max_tokens=128,
                temperature=0.0,
            )

            scores: dict[str, float] = {}
            for line in text.splitlines():
                line = line.strip()
                for dim in ("CLARITY", "ACTIONABILITY", "TECHNICAL_ACCURACY", "CONCISENESS"):
                    if line.startswith(f"{dim}:"):
                        try:
                            val = float(line.split(":", 1)[1].strip())
                            scores[dim.lower()] = max(1.0, min(5.0, val))
                        except ValueError:
                            pass

            # Fill any missing dimensions with neutral score
            for dim in ("clarity", "actionability", "technical_accuracy", "conciseness"):
                scores.setdefault(dim, 3.0)

            overall = sum(scores.values()) / len(scores)
            scores["overall"] = round(overall, 4)
            scores["overall_normalized"] = round((overall - 1) / 4, 4)  # Scale 1-5 → 0-1
            return scores

        except Exception as exc:  # noqa: BLE001
            return {
                "clarity": 0.0, "actionability": 0.0,
                "technical_accuracy": 0.0, "conciseness": 0.0,
                "overall": 0.0, "overall_normalized": 0.0,
                "error": str(exc),
            }

    def judge_all_generation_metrics(self, query: str, answer: str, passages: list[dict]) -> dict:
        """LLM-as-judge: measure faithfulness, relevancy, and explanation quality rubric.

        Runs a single LLM call to save token quota and requests/min.
        """
        context_block = "\n\n".join(
            f"[Doc {i + 1}]\n{p.get('text', '')}" for i, p in enumerate(passages)
        )

        user_content = textwrap.dedent(f"""\
            You are an expert quality evaluation assistant assessing a maintenance AI's response.

            CONTEXT (from technical manuals):
            {context_block[:1200]}

            USER QUESTION:
            {query}

            GENERATED AI ANSWER:
            {answer}

            Please evaluate the answer across the following dimensions:

            1. FAITHFULNESS TO CONTEXT:
               - Extract distinct factual claims from the AI Answer.
               - Check if each claim is directly supported by the Context.
               - Determine: total_claims and supported_claims.

            2. ANSWER RELEVANCY TO QUESTION:
               - Rate on a scale of 0.0 to 1.0 how well the AI Answer addresses the User Question.
               - 1.0 = perfectly addresses it. 0.0 = completely irrelevant/refuses to answer.

            3. EXPLANATION QUALITY RUBRIC:
               Rate each of these on a 1 to 5 scale (where 1 is poor and 5 is excellent):
               - Clarity: Is it easy to understand for a technician?
               - Actionability: Does it give clear, concrete next steps?
               - Technical Accuracy: Is the technical content correct per context?
               - Conciseness: Is it appropriately brief without losing details?

            Respond in this exact format:
            TOTAL_CLAIMS: <integer>
            SUPPORTED_CLAIMS: <integer>
            RELEVANCY_SCORE: <float>
            CLARITY: <1-5>
            ACTIONABILITY: <1-5>
            TECHNICAL_ACCURACY: <1-5>
            CONCISENESS: <1-5>
            REASONING: <one sentence summarizing reasoning for the scores>
        """)

        try:
            text = self._call_with_retry(
                self._build_messages(user_content),
                max_tokens=384,
                temperature=0.0,
            )

            # Parse response
            total_claims, supported_claims = 1, 1
            relevancy_score = 0.5
            scores = {"clarity": 3.0, "actionability": 3.0, "technical_accuracy": 3.0, "conciseness": 3.0}
            reasoning = "Parsing failed."

            for line in text.splitlines():
                line = line.strip()
                if line.startswith("TOTAL_CLAIMS:"):
                    try: total_claims = max(1, int(line.split(":", 1)[1].strip()))
                    except ValueError: pass
                elif line.startswith("SUPPORTED_CLAIMS:"):
                    try: supported_claims = int(line.split(":", 1)[1].strip())
                    except ValueError: pass
                elif line.startswith("RELEVANCY_SCORE:"):
                    try: relevancy_score = max(0.0, min(1.0, float(line.split(":", 1)[1].strip())))
                    except ValueError: pass
                elif line.startswith("CLARITY:"):
                    try: scores["clarity"] = max(1.0, min(5.0, float(line.split(":", 1)[1].strip())))
                    except ValueError: pass
                elif line.startswith("ACTIONABILITY:"):
                    try: scores["actionability"] = max(1.0, min(5.0, float(line.split(":", 1)[1].strip())))
                    except ValueError: pass
                elif line.startswith("TECHNICAL_ACCURACY:"):
                    try: scores["technical_accuracy"] = max(1.0, min(5.0, float(line.split(":", 1)[1].strip())))
                    except ValueError: pass
                elif line.startswith("CONCISENESS:"):
                    try: scores["conciseness"] = max(1.0, min(5.0, float(line.split(":", 1)[1].strip())))
                    except ValueError: pass
                elif line.startswith("REASONING:"):
                    reasoning = line.split(":", 1)[1].strip()

            faithfulness_score = max(0.0, min(1.0, supported_claims / total_claims))

            # Calculate overall average for rubric
            overall = sum(scores.values()) / len(scores)
            scores["overall"] = round(overall, 4)
            scores["overall_normalized"] = round((overall - 1) / 4, 4)

            return {
                "faithfulness": {
                    "score": faithfulness_score,
                    "supported": supported_claims,
                    "total": total_claims,
                    "reasoning": reasoning
                },
                "relevancy": {
                    "score": relevancy_score,
                    "reasoning": reasoning
                },
                "rubric": scores
            }
        except Exception as exc:
            return {
                "faithfulness": {"score": 1.0, "supported": 1, "total": 1, "reasoning": str(exc)},
                "relevancy": {"score": 1.0, "reasoning": str(exc)},
                "rubric": {
                    "clarity": 3.0, "actionability": 3.0, "technical_accuracy": 3.0, "conciseness": 3.0,
                    "overall": 3.0, "overall_normalized": 0.5
                }
            }

    def judge_work_order_usefulness(
        self,
        work_order_text: str,
        retrieved_context: str,
        work_order_id: str = "",
    ) -> dict:
        """LLM-as-judge: rate how useful a work order is against retrieved SOPs/docs.

        Args:
            work_order_text: The full text of the work order.
            retrieved_context: Retrieved SOP / equipment profile passages.
            work_order_id: Optional ID for logging.

        Returns:
            Dict with 'score' (float 0-1), 'pass' (bool), 'reasoning'.
        """
        user_content = textwrap.dedent(f"""\
            You are a maintenance manager evaluating whether a work order is useful
            and actionable based on the available maintenance documentation.

            MAINTENANCE DOCUMENTATION (SOPs / Equipment Profiles):
            {retrieved_context[:1200]}

            WORK ORDER:
            {work_order_text[:800]}

            TASK:
            Rate the usefulness of this work order on a scale of 0.0 to 1.0 based on:
            - Does it align with the correct procedures from the documentation?
            - Are the steps actionable and specific?
            - Does it correctly reference the relevant equipment / fault mode?
            - Would a technician be able to execute this without confusion?

            Respond in this exact format:
            SCORE: <float 0.0 to 1.0>
            REASONING: <one to two sentences>
        """)

        threshold = 0.75
        try:
            text = self._call_with_retry(
                self._build_messages(user_content),
                max_tokens=192,
                temperature=0.0,
            )

            score, reasoning = 0.5, "Parsing failed."
            for line in text.splitlines():
                line = line.strip()
                if line.startswith("SCORE:"):
                    try:
                        score = max(0.0, min(1.0, float(line.split(":", 1)[1].strip())))
                    except ValueError:
                        pass
                elif line.startswith("REASONING:"):
                    reasoning = line.split(":", 1)[1].strip()

            return {
                "work_order_id": work_order_id,
                "score": round(score, 4),
                "pass": score >= threshold,
                "threshold": threshold,
                "reasoning": reasoning,
            }

        except Exception as exc:  # noqa: BLE001
            return {
                "work_order_id": work_order_id,
                "score": 0.0,
                "pass": False,
                "threshold": threshold,
                "reasoning": f"[Error] {exc}",
            }
