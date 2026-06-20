"""Merge curated answer batches into data/questions.json."""

import json
from collections import Counter
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
CURATED_BASE = PROJECT_ROOT / "data" / "questions-curated.json"
BATCH_DIR = PROJECT_ROOT / "data" / "_batches"
OUTPUT = PROJECT_ROOT / "data" / "questions.json"


def main() -> None:
    base = json.loads(CURATED_BASE.read_text(encoding="utf-8"))
    questions = base["questions"]

    answers = {}
    for path in sorted(BATCH_DIR.glob("batch-*-curated.json")):
        for item in json.loads(path.read_text(encoding="utf-8")):
            answers[item["id"]] = item

    missing = [q["id"] for q in questions if q["id"] not in answers]
    if missing:
        raise SystemExit(f"Missing curated answers for: {missing}")

    final_questions = []
    for q in questions:
        a = answers[q["id"]]
        merged = dict(q)
        merged.update(
            {
                "module": a.get("module"),
                "topic": a.get("topic"),
                "correctKey": a.get("correctKey"),
                "justification": a.get("justification"),
                "sourceFile": a.get("sourceFile"),
                "sourceLine": a.get("sourceLine"),
                "verifiedBy": "opencode-curation-v1",
            }
        )

        valid_keys = {choice["key"] for choice in merged["choices"]}
        if merged["correctKey"] not in valid_keys:
            raise SystemExit(
                f"Invalid correctKey for {merged['id']}: {merged['correctKey']} not in {sorted(valid_keys)}"
            )
        final_questions.append(merged)

    payload = {
        "version": 1,
        "description": "Banco curado para practicar el Parcial 2 de Ingeniería de Software.",
        "totalQuestions": len(final_questions),
        "excludedIds": base.get("excludedIds", []),
        "stats": {
            "byType": dict(Counter(q["type"] for q in final_questions)),
            "byModule": dict(Counter(q["module"] for q in final_questions)),
            "byCorrectKey": dict(Counter(q["correctKey"] for q in final_questions)),
        },
        "questions": final_questions,
    }

    OUTPUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {OUTPUT}")
    print(json.dumps(payload["stats"], ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
