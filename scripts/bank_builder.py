"""Generador compartido de bancos de preguntas para examen-app.

Cada materia tiene su propio script (en su carpeta de estudio) que hace:

    import sys; sys.path.insert(0, "<ruta a examen-app>/scripts")
    from bank_builder import Bank

    bank = Bank("soa", sources={"M3L1": "Módulo 3 - Lectura 1 (...)"}, distractors=H)
    q = bank.q
    q("M3L1", "Tema", "¿Enunciado?", "Correcta.", ["Incorrecta 1.", "..."], "Justificación.")
    ...
    bank.build("soa-parcial2", "Banco para practicar ...")

Formato de q(src, topic, question, correct, wrong, just):
- correct: str (opción simple) o list[str] (opción múltiple).
- wrong="VF": verdadero/falso, con correct = "Verdadero" o "Falso".
- El módulo se toma de los dos primeros caracteres de src ("M3L1" -> "M3").
- La app mezcla las opciones, así que da igual el orden en que se cargan.

Áreas: si existe data/areas/<bank_id>.json ({área: [temas]}), build() le agrega "area" a cada
pregunta (agrupa temas chicos para las estadísticas). Todo tema tiene que tener área.

distractors (opcional): {texto original de la correcta: (nueva correcta o None, [incorrectas])}
para reemplazar distractores sin tocar el enunciado. Ver build() para el control de sesgo.
"""

import json
from pathlib import Path

APP_ROOT = Path(__file__).resolve().parents[1]
BANKS_DIR = APP_ROOT / "data" / "banks"
AREAS_DIR = APP_ROOT / "data" / "areas"


def apply_areas(bank_id, questions):
    """Asigna "area" según data/areas/<bank_id>.json. Devuelve False si no hay mapeo."""
    path = AREAS_DIR / f"{bank_id}.json"
    if not path.exists():
        return False
    topic_to_area = {}
    for area, topics in json.loads(path.read_text(encoding="utf-8")).items():
        for topic in topics:
            assert topic not in topic_to_area, f"Tema en dos áreas: {topic}"
            topic_to_area[topic] = area
    missing = sorted({q["topic"] for q in questions} - set(topic_to_area))
    assert not missing, f"Temas sin área en {path.name}: {missing}"
    for q in questions:
        q["area"] = topic_to_area[q["topic"]]
    return True


class Bank:
    def __init__(self, id_prefix, sources, distractors=None):
        self.id_prefix = id_prefix
        self.sources = sources
        self.distractors = distractors or {}
        self.items = []

    def q(self, src, topic, question, correct, wrong, just):
        assert src in self.sources, f"Fuente desconocida: {src}"
        self.items.append((src, topic, question, correct, wrong, just))

    def _questions(self):
        used = set()
        out = []
        for i, (src, topic, question, correct, wrong, just) in enumerate(self.items, 1):
            if wrong != "VF" and isinstance(correct, str) and correct in self.distractors:
                used.add(correct)
                new, wrong = self.distractors[correct]
                correct = new or correct
            if wrong == "VF":
                assert correct in ("Verdadero", "Falso"), question
                choices = [{"key": "A", "text": "Verdadero"}, {"key": "B", "text": "Falso"}]
                ck = ["A"] if correct == "Verdadero" else ["B"]
                qtype = "true-false"
            else:
                corrects = correct if isinstance(correct, list) else [correct]
                texts = corrects + list(wrong)
                assert len(set(texts)) == len(texts), f"Opciones repetidas en: {question}"
                choices = [{"key": chr(65 + j), "text": t} for j, t in enumerate(texts)]
                ck = [chr(65 + j) for j in range(len(corrects))]
                qtype = "multiple" if len(corrects) > 1 else "choice"
            item = {
                "id": f"{self.id_prefix}-{i:03d}",
                "type": qtype,
                "module": src[:2],
                "topic": topic,
                "question": question,
                "choices": choices,
                "correctKey": ck[0],
                "justification": just,
                "sourceFile": self.sources[src],
                "sourceLine": "",
            }
            if len(ck) > 1:
                item["correctKeys"] = ck
            out.append(item)

        unused = set(self.distractors) - used
        assert not unused, f"Distractores sin pregunta: {unused}"
        return out

    def build(self, bank_id, description):
        out = self._questions()
        apply_areas(bank_id, out)
        by_mod, by_type = {}, {}
        for it in out:
            by_mod[it["module"]] = by_mod.get(it["module"], 0) + 1
            by_type[it["type"]] = by_type.get(it["type"], 0) + 1
        data = {
            "version": 1,
            "description": description,
            "totalQuestions": len(out),
            "stats": {"byModule": by_mod, "byType": by_type},
            "questions": out,
        }
        dest = BANKS_DIR / f"{bank_id}.json"
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"{len(out)} preguntas → {dest}")
        print("Por módulo:", by_mod, "| Por tipo:", by_type)
        length_report(out)
        if not any(b["id"] == bank_id for b in json.loads((APP_ROOT / "data" / "banks.json").read_text())["banks"]):
            print(f"Ojo: '{bank_id}' todavía no figura en data/banks.json, no va a aparecer en el selector.")
        return dest


def length_report(questions, verbose=False):
    """Avisa si la respuesta correcta se delata por ser la opción más larga."""
    singles = [q for q in questions if q["type"] == "choice"]
    if not singles:
        return
    longest, shortest = [], []
    for q in singles:
        lens = {c["key"]: len(c["text"]) for c in q["choices"]}
        right = lens[q["correctKey"]]
        wrong = [v for k, v in lens.items() if k != q["correctKey"]]
        if right > max(wrong):
            longest.append((right - max(wrong), q["id"], q["question"]))
        if right < min(wrong):
            shortest.append((min(wrong) - right, q["id"], q["question"]))
    chance = sum(1 / len(q["choices"]) for q in singles) / len(singles)
    for label, items, sign in (("larga", longest, "+"), ("corta", shortest, "-")):
        share = len(items) / len(singles)
        print(f"Correcta = opción más {label} en {share:.0%} de las de opción simple (por azar ≈ {chance:.0%}).")
        if share > chance + 0.15 or verbose:
            for diff, qid, text in sorted(items, reverse=True)[:15]:
                print(f"  {sign}{diff:>3} caracteres  {qid}  {text[:80]}")
