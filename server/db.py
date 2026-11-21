"""Acceso a la base SQLite: perfiles, bancos y preguntas."""

import json
import os
import sqlite3
from contextlib import contextmanager
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DB_PATH = Path(os.environ.get("EXAMEN_DB", ROOT / "var" / "examen.db"))

# Configuración por defecto de un examen (se puede pisar por banco).
DEFAULT_CONFIG = {"size": 20, "mix": {"simple": [10, 12], "trueFalse": [2, 3]}}

SCHEMA = """
CREATE TABLE IF NOT EXISTS profiles (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT NOT NULL UNIQUE COLLATE NOCASE,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS banks (
  id          TEXT PRIMARY KEY,
  title       TEXT NOT NULL,
  subject     TEXT NOT NULL,
  exam        TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  -- NULL = visible para todos los perfiles.
  owner_id    INTEGER REFERENCES profiles(id) ON DELETE SET NULL,
  config      TEXT NOT NULL DEFAULT '{}',
  position    INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS questions (
  bank_id  TEXT NOT NULL REFERENCES banks(id) ON DELETE CASCADE,
  id       TEXT NOT NULL,
  position INTEGER NOT NULL,
  data     TEXT NOT NULL,
  PRIMARY KEY (bank_id, id)
);

-- Cada respuesta corregida, en el momento (no hace falta terminar el examen).
-- Alimenta las estadísticas por área/tema. Sin FK a questions: al reimportar un banco
-- se borran y recrean sus preguntas, y el historial tiene que sobrevivir.
CREATE TABLE IF NOT EXISTS answers (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  profile_id   INTEGER NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  bank_id      TEXT NOT NULL REFERENCES banks(id) ON DELETE CASCADE,
  question_id  TEXT NOT NULL,
  selected     TEXT NOT NULL,
  is_correct   INTEGER NOT NULL,
  answered_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
CREATE INDEX IF NOT EXISTS answers_profile_bank ON answers (profile_id, bank_id, answered_at);
"""


def connect() -> sqlite3.Connection:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    conn.execute("PRAGMA journal_mode = WAL")
    return conn


@contextmanager
def session():
    conn = connect()
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def init_db() -> None:
    with session() as conn:
        conn.executescript(SCHEMA)


def bank_config(raw: str | None) -> dict:
    config = {**DEFAULT_CONFIG}
    try:
        config.update(json.loads(raw or "{}"))
    except json.JSONDecodeError:
        pass
    return config


def upsert_bank(conn: sqlite3.Connection, meta: dict, questions: list[dict], owner_id: int | None) -> int:
    """Crea o reemplaza un banco con todas sus preguntas. Devuelve cuántas preguntas quedaron."""
    conn.execute(
        """
        INSERT INTO banks (id, title, subject, exam, description, owner_id, config, position)
        VALUES (:id, :title, :subject, :exam, :description, :owner_id, :config,
                COALESCE((SELECT MAX(position) + 1 FROM banks), 0))
        ON CONFLICT(id) DO UPDATE SET
          title = excluded.title, subject = excluded.subject, exam = excluded.exam,
          description = excluded.description, owner_id = excluded.owner_id,
          config = excluded.config,
          updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
        """,
        {
            "id": meta["id"],
            "title": meta["title"],
            "subject": meta["subject"],
            "exam": meta["exam"],
            "description": meta.get("description", ""),
            "owner_id": owner_id,
            "config": json.dumps(meta.get("config", {}), ensure_ascii=False),
        },
    )
    conn.execute("DELETE FROM questions WHERE bank_id = ?", (meta["id"],))
    conn.executemany(
        "INSERT INTO questions (bank_id, id, position, data) VALUES (?, ?, ?, ?)",
        [(meta["id"], q["id"], i, json.dumps(q, ensure_ascii=False)) for i, q in enumerate(questions)],
    )
    return len(questions)
