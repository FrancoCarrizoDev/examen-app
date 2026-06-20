"""
Fetch the 9 Microsoft Forms for Parcial 2 (Ingeniería de Software) and consolidate
the questions into data/questions-raw.json.

Each form returns 20 questions. The actual structure of the API response is:
- top-level `title` (clean string)
- `questions[]` with `title` (clean question text) and `questionInfo` (JSON
  string containing a `Choices` array with `Description` for each option).
Some questions in some forms are malformed (1, 2 or 4 choices instead of 5) —
we extract them and flag them for review.
"""

import json
import re
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

API_BASE = (
    "https://forms.office.com/formapi/api/"
    "e715177a-8963-49dc-a267-25aa1ff36521/users/"
    "c5e619bf-bab6-4484-a7c6-c0a569f24284/light/"
    "runtimeForms('{form_id}')?$expand=questions($expand=choices)"
)

FORMS = [
    ("ejemplo-1", "ehcV52OJ3EmiZyWqH_NlIb8Z5sW2uoREp8bApWnyQoRUQlZWM1M5VDVPNVQwQUkyS1NLSFQ3UkhYNC4u"),
    ("ejemplo-2", "ehcV52OJ3EmiZyWqH_NlIb8Z5sW2uoREp8bApWnyQoRUN0ZYVU1KNklFTjAyNkM0MTdSWVlHOUVETy4u"),
    ("ejemplo-3", "ehcV52OJ3EmiZyWqH_NlIb8Z5sW2uoREp8bApWnyQoRURElaVTlKOU9MSTdFRUk5S0c4NFpDUEZWNC4u"),
    ("ejemplo-4", "ehcV52OJ3EmiZyWqH_NlIb8Z5sW2uoREp8bApWnyQoRUOVdJVUNUV0czSVlENUFTOVk1MjcwUVNOUC4u"),
    ("ejemplo-5", "ehcV52OJ3EmiZyWqH_NlIb8Z5sW2uoREp8bApWnyQoRURU1DNTFMNjVZR1VWQTBZNUFPNlVXN1I3VS4u"),
    ("ejemplo-6", "ehcV52OJ3EmiZyWqH_NlIb8Z5sW2uoREp8bApWnyQoRUQ081MTVFNFU5SVRWTjJWN1dYUEhDOTdPWS4u"),
    ("ejemplo-7", "ehcV52OJ3EmiZyWqH_NlIb8Z5sW2uoREp8bApWnyQoRUQk41SEVINThCMDdTQUdTOFM2MzlZU0gxTi4u"),
    ("ejemplo-8", "ehcV52OJ3EmiZyWqH_NlIb8Z5sW2uoREp8bApWnyQoRUNTFQNk1JMDBLNTBCMFdPQjAwRTgwUkdVNC4u"),
    ("ejemplo-9", "ehcV52OJ3EmiZyWqH_NlIb8Z5sW2uoREp8bApWnyQoRURUdJR05UM0lKQ0FOTVZLQTBYTDA3QldQTC4u"),
]

HTML_TAG_RE = re.compile(r"<[^>]+>")
NBSP_RE = re.compile(r"[\u00A0\u2007\u202F]")
WS_RE = re.compile(r"\s+")
CHOICE_KEY_RE = re.compile(r"^\s*(\d+)\s*[-.\u2013\u2014]?\s*")

TF_SETS = (
    {"verdadero", "falso"},
    {"true", "false"},
    {"si", "no"},
    {"sí", "no"},
    {"v", "f"},
)


def clean_text(raw: str) -> str:
    if not raw:
        return ""
    text = HTML_TAG_RE.sub(" ", raw)
    text = NBSP_RE.sub(" ", text)
    text = WS_RE.sub(" ", text).strip()
    return text


def detect_type(choices: list[str]) -> str:
    keys = {c.strip().lower() for c in choices}
    if keys in TF_SETS:
        return "true-false"
    return "choice"


def extract_questions(payload: dict, form_source: str) -> list[dict]:
    title = clean_text(payload.get("title") or "")
    questions = payload.get("questions") or []
    out = []
    for order_idx, q in enumerate(questions, start=1):
        if q.get("type") == "Question.ColumnGroup":
            continue
        qtext = clean_text(q.get("title") or q.get("formsProRTQuestionTitle") or "")
        if not qtext:
            continue
        try:
            info = json.loads(q.get("questionInfo") or "{}")
        except json.JSONDecodeError:
            info = {}
        raw_choices = info.get("Choices") or []
        cleaned = []
        for c in raw_choices:
            ctext = clean_text(c.get("Description") or "")
            if not ctext:
                continue
            ctext = CHOICE_KEY_RE.sub("", ctext).strip()
            cleaned.append(ctext)
        if not cleaned:
            continue
        normalized = [
            {"key": chr(ord("A") + i), "text": t} for i, t in enumerate(cleaned)
        ]
        qtype = detect_type(cleaned)
        incomplete = len(cleaned) != 5
        out.append({
            "formSource": form_source,
            "formTitle": title,
            "orderInForm": order_idx,
            "type": qtype,
            "nChoices": len(cleaned),
            "incomplete": incomplete,
            "question": qtext,
            "choices": normalized,
        })
    return out


def fetch_form(form_id: str) -> dict:
    url = API_BASE.format(form_id=form_id)
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (compatible; Parcial2QuizFetcher/1.0)",
            "Accept": "application/json",
        },
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode("utf-8"))


def main() -> int:
    project_root = Path(__file__).resolve().parents[1]
    raw_dir = project_root / "data" / "_raw"
    raw_dir.mkdir(parents=True, exist_ok=True)
    output_path = project_root / "data" / "questions-raw.json"

    all_questions: list[dict] = []
    errors: list[str] = []

    for idx, (slug, form_id) in enumerate(FORMS, start=1):
        print(f"[{idx}/9] Fetching {slug} …", flush=True)
        try:
            payload = fetch_form(form_id)
        except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError) as exc:
            errors.append(f"{slug}: {exc}")
            print(f"  ! error: {exc}", flush=True)
            continue
        except json.JSONDecodeError as exc:
            errors.append(f"{slug}: invalid JSON ({exc})")
            print(f"  ! invalid JSON: {exc}", flush=True)
            continue

        cache_path = raw_dir / f"{slug}.json"
        cache_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
        qs = extract_questions(payload, slug)
        print(f"  ok — title='{qs[0]['formTitle'] if qs else ''}', questions={len(qs)}", flush=True)
        all_questions.extend(qs)
        time.sleep(0.4)

    for i, q in enumerate(all_questions, start=1):
        q["id"] = f"q-{i:03d}"

    seen: dict[str, int] = {}
    for q in all_questions:
        key = q["question"].strip().lower()
        seen[key] = seen.get(key, 0) + 1
    duplicates = {k: v for k, v in seen.items() if v > 1}

    incomplete_questions = [q for q in all_questions if q["incomplete"]]
    type_breakdown = {
        "choice": sum(1 for q in all_questions if q["type"] == "choice"),
        "true-false": sum(1 for q in all_questions if q["type"] == "true-false"),
    }
    n_choices_breakdown: dict[int, int] = {}
    for q in all_questions:
        n_choices_breakdown[q["nChoices"]] = n_choices_breakdown.get(q["nChoices"], 0) + 1

    result = {
        "generatedAt": time.strftime("%Y-%m-%dT%H:%M:%S"),
        "totalForms": len(FORMS),
        "successfulForms": len(FORMS) - len(errors),
        "totalQuestions": len(all_questions),
        "typeBreakdown": type_breakdown,
        "nChoicesBreakdown": dict(sorted(n_choices_breakdown.items())),
        "incompleteCount": len(incomplete_questions),
        "duplicateQuestionCount": len(duplicates),
        "errors": errors,
        "questions": all_questions,
    }
    output_path.write_text(
        json.dumps(result, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print()
    print(f"Wrote {output_path}")
    print(f"  totalQuestions     = {result['totalQuestions']}")
    print(f"  typeBreakdown      = {type_breakdown}")
    print(f"  nChoicesBreakdown  = {result['nChoicesBreakdown']}")
    print(f"  incompleteCount    = {result['incompleteCount']}")
    print(f"  duplicates         = {result['duplicateQuestionCount']}")
    if errors:
        print("  errors:")
        for e in errors:
            print(f"    - {e}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
