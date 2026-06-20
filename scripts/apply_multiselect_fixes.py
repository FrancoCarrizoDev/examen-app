"""Apply manual fixes for questions that Microsoft Forms marks as multi-select."""

import json
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
QUESTIONS_PATH = PROJECT_ROOT / "data" / "questions.json"

FIXES = {
    "q-021": ["A", "B", "C", "D"],
    "q-054": ["A", "B", "C"],
    "q-056": ["B", "C", "D", "E"],
    "q-057": ["A", "B"],
    "q-063": ["A", "B", "C", "D"],
    "q-081": ["A", "B", "C", "D"],
    "q-091": ["A", "B", "C", "D"],
    "q-092": ["A", "B", "C", "D"],
    "q-097": ["A", "B", "C", "D"],
    "q-099": ["A", "B", "C", "D"],
    "q-103": ["A", "B", "C"],
    "q-094": ["A", "B", "C"],
    "q-096": ["A", "B", "C", "D"],
    "q-111": ["A", "B"],
    "q-115": ["A", "B"],
    "q-119": ["A", "B", "C", "D"],
    "q-120": ["A", "B", "C"],
}


def main() -> None:
    data = json.loads(QUESTIONS_PATH.read_text(encoding="utf-8"))
    by_id = {q["id"]: q for q in data["questions"]}

    for qid, keys in FIXES.items():
        q = by_id[qid]
        valid_keys = {choice["key"] for choice in q["choices"]}
        invalid = [key for key in keys if key not in valid_keys]
        if invalid:
            raise SystemExit(f"Invalid keys for {qid}: {invalid}")
        q["type"] = "multiple"
        q["correctKeys"] = keys
        q["correctKey"] = keys[0]

    stats = data.setdefault("stats", {})
    stats["multiSelectCount"] = len(FIXES)
    stats["singleSelectCount"] = data["totalQuestions"] - len(FIXES)

    QUESTIONS_PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Applied {len(FIXES)} multi-select fixes to {QUESTIONS_PATH}")


if __name__ == "__main__":
    main()
