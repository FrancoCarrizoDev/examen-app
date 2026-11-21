"""Importa bancos de preguntas (formato JSON del repo) a la base SQLite.

Uso:
    # Todos los bancos de data/banks.json, asignados al perfil "Fran":
    .venv/bin/python -m server.import_banks --all --owner Fran

    # Un archivo suelto (pide los metadatos por flags):
    .venv/bin/python -m server.import_banks data/banks/x.json --id x --title "..." \
        --subject "..." --exam "Simulador Parcial 2" --owner Fran

Si el banco ya existe se reemplazan sus preguntas.
Sin --owner el banco queda visible para todos los perfiles.
"""

import argparse
import json
import sys
from pathlib import Path

from . import db


def validate(questions: list[dict]) -> list[str]:
    """Devuelve una lista de problemas; vacía si el banco está bien."""
    problems = []
    seen_ids = set()
    for i, q in enumerate(questions, 1):
        where = f"pregunta #{i} ({q.get('id', 'sin id')})"
        qid = q.get("id")
        if not qid:
            problems.append(f"{where}: falta 'id'")
        elif qid in seen_ids:
            problems.append(f"{where}: id duplicado")
        seen_ids.add(qid)
        if not str(q.get("question", "")).strip():
            problems.append(f"{where}: falta el enunciado")
        choices = q.get("choices") or []
        keys = [c.get("key") for c in choices]
        if len(choices) < 2:
            problems.append(f"{where}: necesita al menos 2 opciones")
        correct = q.get("correctKeys") or ([q["correctKey"]] if q.get("correctKey") else [])
        if not correct:
            problems.append(f"{where}: falta la respuesta correcta")
        for key in correct:
            if key not in keys:
                problems.append(f"{where}: la respuesta correcta '{key}' no está entre las opciones")
    return problems


def ensure_profile(conn, name: str | None) -> int | None:
    if not name:
        return None
    row = conn.execute("SELECT id FROM profiles WHERE name = ?", (name,)).fetchone()
    if row:
        return row["id"]
    return conn.execute("INSERT INTO profiles (name) VALUES (?)", (name,)).lastrowid


def load_questions(path: Path) -> list[dict]:
    data = json.loads(path.read_text(encoding="utf-8"))
    return data["questions"] if isinstance(data, dict) else data


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("file", nargs="?", type=Path, help="JSON de un banco")
    parser.add_argument("--all", action="store_true", help="importar todo data/banks.json")
    parser.add_argument("--owner", help="perfil dueño (se crea si no existe)")
    parser.add_argument("--id")
    parser.add_argument("--title")
    parser.add_argument("--subject")
    parser.add_argument("--exam", default="Simulador")
    parser.add_argument("--description", default="")
    args = parser.parse_args(argv)

    if args.all:
        index = json.loads((db.ROOT / "data" / "banks.json").read_text(encoding="utf-8"))
        jobs = [(meta, db.ROOT / meta["file"]) for meta in index["banks"]]
    elif args.file:
        missing = [f for f in ("id", "title", "subject") if not getattr(args, f)]
        if missing:
            parser.error("faltan: " + ", ".join("--" + m for m in missing))
        meta = {k: getattr(args, k) for k in ("id", "title", "subject", "exam", "description")}
        jobs = [(meta, args.file)]
    else:
        parser.error("pasá un archivo o --all")

    db.init_db()
    failed = False
    with db.session() as conn:
        owner_id = ensure_profile(conn, args.owner)
        for meta, path in jobs:
            questions = load_questions(path)
            problems = validate(questions)
            if problems:
                failed = True
                print(f"✗ {meta['id']}: {len(problems)} problema(s), no se importó", file=sys.stderr)
                for p in problems[:20]:
                    print(f"    - {p}", file=sys.stderr)
                continue
            count = db.upsert_bank(conn, meta, questions, owner_id)
            print(f"✓ {meta['id']}: {count} preguntas")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
