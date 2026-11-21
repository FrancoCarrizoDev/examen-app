"""Agrega "area" a un banco ya generado, según data/areas/<bank_id>.json.

Para bancos cuyo generador vive fuera del repo (los que usan bank_builder lo hacen solos):

    python3 scripts/apply_areas.py bd2-parcial2
"""

import json
import sys

from bank_builder import BANKS_DIR, apply_areas

for bank_id in sys.argv[1:]:
    path = BANKS_DIR / f"{bank_id}.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    if not apply_areas(bank_id, data["questions"]):
        sys.exit(f"No hay data/areas/{bank_id}.json")
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    counts = {}
    for q in data["questions"]:
        counts[q["area"]] = counts.get(q["area"], 0) + 1
    print(f"✓ {bank_id}:", counts)
