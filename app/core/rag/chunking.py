"""Hierarchical Chunking for MechSage Knowledge Base.

Implements the recommended chunking strategy from dev/rag_approaches/02_chunking_strategies.md:
- Parent chunk: Full entry text (fault description + recommended action)
- Child chunks: Symptom description, Recommended action (separate)
- Metadata: fault_mode, components, sensor_cues, entry_id
"""

from __future__ import annotations

import json
import re
from dataclasses import dataclass, field
from pathlib import Path
from typing import Optional


@dataclass
class Chunk:
    """A single chunk with metadata for indexing."""

    chunk_id: str  # Unique ID: "{entry_id}__{chunk_type}"
    text: str  # The chunk text
    chunk_type: str  # "parent", "symptom", "action"
    parent_id: str  # ID of the parent entry
    entry_id: str  # Original KB entry ID

    # Structured metadata for filtered search
    fault_mode: str = ""
    components: list[str] = field(default_factory=list)
    sensor_cues: list[str] = field(default_factory=list)
    asset_type: str = ""  # "turbofan", "milling_machine", or "general"


def _split_symptom_action(text: str) -> tuple[str, Optional[str]]:
    """Split entry text into symptom description and recommended action.

    Returns:
        (symptom_text, action_text) — action_text may be None if no
        'Recommended action:' pattern is found.
    """
    # Look for the "Recommended action:" split point (case-insensitive)
    pattern = r"(Recommended action:|recommended action:)"
    match = re.search(pattern, text)

    if match:
        symptom = text[: match.start()].strip()
        action = text[match.start() :].strip()
        return symptom, action
    else:
        return text.strip(), None


def chunk_entry(entry: dict) -> list[Chunk]:
    """Create hierarchical chunks from a single KB entry.

    Args:
        entry: A dict with keys: id, fault_mode, text, and optionally
               components, sensor_cues.

    Returns:
        List of Chunk objects (1 parent + 1-2 children).
    """
    entry_id = entry["id"]
    text = entry["text"]
    fault_mode = entry.get("fault_mode", "")
    components = entry.get("components", [])
    sensor_cues = entry.get("sensor_cues", [])

    # Determine asset_type based on entry_id prefix or explicit field
    _IRONSIDE_PREFIXES = (
        "ISM-", "SOP-", "ANOMALY-", "WO-", "RUL-", "HIST-", "SPARE-",
    )
    explicit_type = entry.get("asset_type", "")
    if explicit_type == "ironside" or entry_id.startswith(_IRONSIDE_PREFIXES):
        asset_type = "ironside"
    elif entry_id.startswith("MAN-GUIDE"):
        asset_type = "general"
    elif entry_id.startswith(("MAN-TWF", "MAN-HDF", "MAN-PWF", "MAN-OSF", "MAN-RNF")):
        asset_type = "milling_machine"
    else:
        asset_type = "turbofan"

    chunks = []

    # --- Parent chunk: full entry text ---
    parent = Chunk(
        chunk_id=f"{entry_id}__parent",
        text=text,
        chunk_type="parent",
        parent_id=entry_id,
        entry_id=entry_id,
        fault_mode=fault_mode,
        components=components,
        sensor_cues=sensor_cues,
        asset_type=asset_type,
    )
    chunks.append(parent)

    # --- Child chunks: symptom + action ---
    symptom_text, action_text = _split_symptom_action(text)

    if symptom_text:
        symptom_chunk = Chunk(
            chunk_id=f"{entry_id}__symptom",
            text=symptom_text,
            chunk_type="symptom",
            parent_id=entry_id,
            entry_id=entry_id,
            fault_mode=fault_mode,
            components=components,
            sensor_cues=sensor_cues,
            asset_type=asset_type,
        )
        chunks.append(symptom_chunk)

    if action_text:
        action_chunk = Chunk(
            chunk_id=f"{entry_id}__action",
            text=action_text,
            chunk_type="action",
            parent_id=entry_id,
            entry_id=entry_id,
            fault_mode=fault_mode,
            components=components,
            sensor_cues=sensor_cues,
            asset_type=asset_type,
        )
        chunks.append(action_chunk)

    return chunks


_REQUIRED_KB_FIELDS = {"id", "text", "fault_mode"}


def _validate_entry(entry: dict, index: int) -> None:
    """Raise ValueError if a KB entry is missing required fields.

    Args:
        entry: A single KB entry dict.
        index: Zero-based position in the KB file (used in error messages).
    """
    missing = _REQUIRED_KB_FIELDS - entry.keys()
    if missing:
        entry_id = entry.get("id", f"<entry at index {index}>")
        raise ValueError(
            f"Knowledge base entry '{entry_id}' (index {index}) is missing required "
            f"fields: {sorted(missing)}. Each entry must have: {sorted(_REQUIRED_KB_FIELDS)}."
        )


def chunk_knowledge_base(kb_path: Path) -> list[Chunk]:
    """Load and chunk the entire knowledge base.

    Args:
        kb_path: Path to the knowledge_base JSON file.

    Returns:
        List of all Chunk objects (parents + children).

    Raises:
        FileNotFoundError: If kb_path does not exist.
        ValueError: If any entry is missing required fields (id, text, fault_mode).
    """
    if not Path(kb_path).exists():
        raise FileNotFoundError(
            f"Knowledge base file not found: {kb_path}. "
            "Check RAGConfig.kb_path or run the KB generation script."
        )

    with open(kb_path, "r", encoding="utf-8") as f:
        entries = json.load(f)

    all_chunks = []
    for idx, entry in enumerate(entries):
        _validate_entry(entry, idx)
        all_chunks.extend(chunk_entry(entry))

    return all_chunks


def get_parent_chunks(chunks: list[Chunk]) -> dict[str, Chunk]:
    """Build a lookup from entry_id → parent Chunk.

    Used during retrieval: search matches a child chunk,
    but we return the parent chunk to the LLM for full context.
    """
    return {c.entry_id: c for c in chunks if c.chunk_type == "parent"}


if __name__ == "__main__":
    # Quick test
    kb_path = Path(__file__).parent / "knowledge_base" / "knowledge_base_v2.json"
    chunks = chunk_knowledge_base(kb_path)

    print(f"Total entries: {len(set(c.entry_id for c in chunks))}")
    print(f"Total chunks: {len(chunks)}")
    print(f"  Parents: {sum(1 for c in chunks if c.chunk_type == 'parent')}")
    print(f"  Symptoms: {sum(1 for c in chunks if c.chunk_type == 'symptom')}")
    print(f"  Actions: {sum(1 for c in chunks if c.chunk_type == 'action')}")
    print()

    # Show one example
    example = [c for c in chunks if c.entry_id == "MAN-HPC-01"]
    for c in example:
        print(f"  [{c.chunk_type}] {c.chunk_id}")
        print(f"    Text: {c.text[:80]}...")
        print()
