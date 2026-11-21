"""API del simulador de parciales.

Sirve el frontend estático (index.html, app.js) y una API JSON bajo /api para
perfiles y bancos de preguntas. Los resultados y las preguntas ya vistas NO van
al servidor: quedan en el localStorage de cada navegador, separados por perfil.

Correr en desarrollo:
    .venv/bin/uvicorn server.app:app --reload --port 8000
"""

import json
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

from . import db

@asynccontextmanager
async def lifespan(_app: FastAPI):
    db.init_db()
    yield


app = FastAPI(title="Simulador de parciales", lifespan=lifespan)


# ---------- Perfiles ----------


class ProfileIn(BaseModel):
    name: str = Field(min_length=1, max_length=40)


@app.get("/api/health")
def health() -> dict:
    return {"ok": True}


@app.get("/api/profiles")
def list_profiles() -> list[dict]:
    with db.session() as conn:
        return [dict(r) for r in conn.execute("SELECT id, name FROM profiles ORDER BY id")]


@app.post("/api/profiles", status_code=201)
def create_profile(body: ProfileIn) -> dict:
    name = body.name.strip()
    if not name:
        raise HTTPException(422, "El nombre no puede estar vacío")
    with db.session() as conn:
        if conn.execute("SELECT 1 FROM profiles WHERE name = ?", (name,)).fetchone():
            raise HTTPException(409, f"Ya existe un perfil llamado {name}")
        cur = conn.execute("INSERT INTO profiles (name) VALUES (?)", (name,))
        return {"id": cur.lastrowid, "name": name}


# ---------- Bancos ----------


def bank_meta(row) -> dict:
    return {
        "id": row["id"],
        "title": row["title"],
        "subject": row["subject"],
        "exam": row["exam"],
        "description": row["description"],
        "ownerId": row["owner_id"],
        "config": db.bank_config(row["config"]),
        "questionCount": row["question_count"],
    }


BANK_SELECT = """
SELECT b.*, (SELECT COUNT(*) FROM questions q WHERE q.bank_id = b.id) AS question_count
FROM banks b
"""


@app.get("/api/banks")
def list_banks(profile: int | None = None) -> list[dict]:
    """Bancos visibles para el perfil: los suyos y los que no tienen dueño."""
    with db.session() as conn:
        if profile is None:
            rows = conn.execute(BANK_SELECT + " ORDER BY b.position, b.title")
        else:
            rows = conn.execute(
                BANK_SELECT + " WHERE b.owner_id IS NULL OR b.owner_id = ? ORDER BY b.position, b.title",
                (profile,),
            )
        return [bank_meta(r) for r in rows]


@app.get("/api/banks/{bank_id}")
def get_bank(bank_id: str) -> dict:
    with db.session() as conn:
        row = conn.execute(BANK_SELECT + " WHERE b.id = ?", (bank_id,)).fetchone()
        if not row:
            raise HTTPException(404, "Banco inexistente")
        questions = [
            json.loads(r["data"])
            for r in conn.execute("SELECT data FROM questions WHERE bank_id = ? ORDER BY position", (bank_id,))
        ]
        return {**bank_meta(row), "questions": questions}


# ---------- Frontend estático ----------

# Solo se exponen los archivos del frontend; no el repo entero (ni var/ con la base).
@app.get("/", include_in_schema=False)
def index() -> FileResponse:
    return FileResponse(db.ROOT / "index.html", headers={"Cache-Control": "no-store"})


@app.get("/app.js", include_in_schema=False)
def app_js() -> FileResponse:
    return FileResponse(db.ROOT / "app.js", media_type="text/javascript", headers={"Cache-Control": "no-store"})


# Los JSON estáticos quedan disponibles como respaldo (modo sin servidor / GitHub Pages).
app.mount("/data", StaticFiles(directory=db.ROOT / "data"), name="data")
