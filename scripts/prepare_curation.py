"""
Build a curated questions list from the raw pool:
- drop incomplete / single-choice broken questions (q-109)
- drop duplicates (keep first occurrence)
- produce a per-batch plan for parallel subagents
- generate a working JSON that subagents will fill in
"""

import json
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]
RAW_PATH = PROJECT_ROOT / "data" / "questions-raw.json"
OUT_PATH = PROJECT_ROOT / "data" / "questions-curated.json"
BATCH_DIR = PROJECT_ROOT / "data" / "_batches"

# Broken question (only 1 choice) to exclude
EXCLUDED_IDS = {"q-109"}

BATCH_SIZE = 45


def main() -> None:
    data = json.loads(RAW_PATH.read_text(encoding="utf-8"))
    seen_keys: set[str] = set()
    curated: list[dict] = []
    excluded_dupes: list[str] = []

    for q in data["questions"]:
        if q["id"] in EXCLUDED_IDS:
            continue
        norm = q["question"].strip().lower()
        if norm in seen_keys:
            excluded_dupes.append(q["id"])
            continue
        seen_keys.add(norm)
        curated.append({
            "id": q["id"],
            "formSource": q["formSource"],
            "formTitle": q["formTitle"],
            "orderInForm": q["orderInForm"],
            "type": q["type"],
            "nChoices": q["nChoices"],
            "incomplete": q["incomplete"],
            "question": q["question"],
            "choices": q["choices"],
            "module": None,
            "topic": None,
            "correctKey": None,
            "justification": None,
            "sourceFile": None,
            "sourceLine": None,
            "verifiedBy": None,
        })

    print(f"Total raw: {len(data['questions'])}")
    print(f"Excluded (broken/dup): {1 + len(excluded_dupes)}")
    print(f"  - q-109 (broken): yes")
    print(f"  - dupes: {excluded_dupes}")
    print(f"Curated: {len(curated)}")

    OUT_PATH.write_text(
        json.dumps(
            {
                "totalQuestions": len(curated),
                "excludedIds": sorted(EXCLUDED_IDS | set(excluded_dupes)),
                "questions": curated,
            },
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )
    print(f"Wrote {OUT_PATH}")

    BATCH_DIR.mkdir(parents=True, exist_ok=True)
    n_batches = (len(curated) + BATCH_SIZE - 1) // BATCH_SIZE
    for i in range(n_batches):
        batch = curated[i * BATCH_SIZE:(i + 1) * BATCH_SIZE]
        batch_path = BATCH_DIR / f"batch-{i + 1:02d}.json"
        batch_path.write_text(
            json.dumps(batch, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
        first_id = batch[0]["id"]
        last_id = batch[-1]["id"]
        print(f"  batch-{i + 1:02d}.json: {len(batch)} questions ({first_id}..{last_id})")


if __name__ == "__main__":
    main()
