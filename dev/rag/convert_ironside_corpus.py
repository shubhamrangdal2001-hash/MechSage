"""Ironside RAG Corpus Compiler.

Reads all markdown files from data/ironside_rag_corpus/, extracts YAML frontmatter
and body text, and appends the entries to knowledge_base_v2.json in the format
expected by the MechSage chunking pipeline.

Usage:
    python dev/rag/convert_ironside_corpus.py

The script is idempotent: it removes any existing ISM/SOP/ANOMALY/WO/RUL/HIST/SPARE
prefixed entries before re-adding them, so it is safe to run multiple times.
"""

from __future__ import annotations

import json
import re
from pathlib import Path


# ── Paths ─────────────────────────────────────────────────────────────────────
WORKSPACE_ROOT = Path(__file__).resolve().parents[2]
CORPUS_DIR = WORKSPACE_ROOT / "data" / "ironside_rag_corpus"
KB_PATH = WORKSPACE_ROOT / "dev" / "rag" / "knowledge_base" / "knowledge_base_v2.json"

# Prefixes that identify Ironside-generated entries
IRONSIDE_PREFIXES = (
    "ISM-", "SOP-", "ANOMALY-", "WO-", "RUL-", "HIST-", "SPARE-",
)


def parse_frontmatter(text: str) -> tuple[dict, str]:
    """Extract YAML-style frontmatter and body from a markdown file.

    Returns:
        (metadata_dict, body_text)
    """
    pattern = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.DOTALL)
    match = pattern.match(text)
    if not match:
        return {}, text.strip()

    frontmatter_str = match.group(1)
    body = text[match.end():].strip()

    metadata: dict = {}
    for line in frontmatter_str.splitlines():
        line = line.strip()
        if not line or ":" not in line:
            continue
        key, _, value = line.partition(":")
        key = key.strip()
        value = value.strip()

        # Parse list values: [item1, item2] → ["item1", "item2"]
        if value.startswith("[") and value.endswith("]"):
            inner = value[1:-1]
            items = [v.strip().strip("'\"") for v in inner.split(",") if v.strip()]
            metadata[key] = items
        else:
            metadata[key] = value

    return metadata, body


def extract_fault_mode_and_text(body: str, metadata: dict) -> tuple[str, str]:
    """Build the 'text' field from the document body.

    Strips markdown headers from the top of the body to keep the
    text field focused on content. Uses metadata fault_mode if available.
    """
    # Remove the first H1 heading (document title)
    body_lines = body.split("\n")
    while body_lines and body_lines[0].startswith("#"):
        body_lines.pop(0)
    cleaned = "\n".join(body_lines).strip()

    # Collapse excessive whitespace
    cleaned = re.sub(r"\n{3,}", "\n\n", cleaned)

    # Use first 800 characters as the 'text' for the KB entry (RAG retrieval unit)
    # Full body is truncated for the JSON store; embeddings are computed from this
    text = cleaned[:1200].strip()

    fault_mode = metadata.get("fault_mode", "general")
    return fault_mode, text


def build_entry(metadata: dict, body: str) -> dict:
    """Build a knowledge-base entry dict from frontmatter + body."""
    entry_id = metadata.get("id", "")
    if not entry_id:
        raise ValueError("Every Ironside corpus file must have an 'id' in frontmatter.")

    fault_mode, text = extract_fault_mode_and_text(body, metadata)

    components = metadata.get("components", [])
    if isinstance(components, str):
        components = [components]

    sensor_cues = metadata.get("sensor_cues", [])
    if isinstance(sensor_cues, str):
        sensor_cues = [sensor_cues]

    return {
        "id": entry_id,
        "fault_mode": fault_mode,
        "components": components,
        "sensor_cues": sensor_cues,
        "text": text,
        "asset_type": "ironside",  # explicit tag for pipeline routing
    }


def load_existing_kb(kb_path: Path) -> list[dict]:
    """Load the existing knowledge base from disk."""
    if not kb_path.exists():
        print(f"[Converter] Knowledge base not found at {kb_path}. Starting fresh.")
        return []
    with open(kb_path, "r", encoding="utf-8") as f:
        return json.load(f)


def remove_ironside_entries(entries: list[dict]) -> list[dict]:
    """Remove all existing Ironside entries so we can re-add fresh ones."""
    kept = [
        e for e in entries
        if not any(e.get("id", "").startswith(prefix) for prefix in IRONSIDE_PREFIXES)
    ]
    removed = len(entries) - len(kept)
    if removed:
        print(f"[Converter] Removed {removed} existing Ironside entries (will re-add).")
    return kept


def compile_corpus(corpus_dir: Path) -> list[dict]:
    """Parse all .md files in the corpus directory and build KB entries."""
    md_files = sorted(corpus_dir.glob("*.md"))
    if not md_files:
        raise FileNotFoundError(f"No markdown files found in {corpus_dir}")

    entries = []
    errors = []
    for md_file in md_files:
        try:
            text = md_file.read_text(encoding="utf-8")
            metadata, body = parse_frontmatter(text)
            if not metadata.get("id"):
                print(f"[Converter] WARNING: {md_file.name} has no 'id' — skipping.")
                continue
            entry = build_entry(metadata, body)
            entries.append(entry)
            print(f"[Converter] OK  {md_file.name} -> {entry['id']}")
        except Exception as e:
            errors.append((md_file.name, str(e)))
            print(f"[Converter] ERR {md_file.name} ERROR: {e}")

    if errors:
        print(f"\n[Converter] {len(errors)} file(s) had errors:")
        for fname, err in errors:
            print(f"  - {fname}: {err}")

    return entries


def main() -> None:
    print("=" * 60)
    print("  MechSage — Ironside Corpus Compiler")
    print("=" * 60)
    print(f"\n[Converter] Corpus directory: {CORPUS_DIR}")
    print(f"[Converter] Knowledge base:   {KB_PATH}\n")

    # 1. Load existing KB
    existing = load_existing_kb(KB_PATH)
    print(f"[Converter] Loaded {len(existing)} existing KB entries.")

    # 2. Remove any stale Ironside entries
    base_entries = remove_ironside_entries(existing)

    # 3. Parse corpus files
    print(f"\n[Converter] Parsing corpus files from {CORPUS_DIR.name}/...")
    new_entries = compile_corpus(CORPUS_DIR)
    print(f"\n[Converter] Parsed {len(new_entries)} Ironside corpus entries.")

    # 4. Merge
    merged = base_entries + new_entries
    print(f"\n[Converter] Total KB entries after merge: {len(merged)}")
    print(f"  - Base (non-Ironside): {len(base_entries)}")
    print(f"  - Ironside (new):      {len(new_entries)}")

    # 5. Write back
    KB_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(KB_PATH, "w", encoding="utf-8") as f:
        json.dump(merged, f, indent=2, ensure_ascii=False)
    print(f"\n[Converter] DONE Knowledge base written to {KB_PATH}")
    print("=" * 60)


if __name__ == "__main__":
    main()
