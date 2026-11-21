# examen-app

Simulador de parciales multiple choice para varias materias. Se elige la materia y el parcial en el selector de arriba (o con `?bank=<id>` en la URL).

## Cómo usar

La app tiene dos modos:

- **Con servidor (Raspberry):** FastAPI + SQLite con los perfiles y los bancos. Cada perfil ve sus materias (y las que no tienen dueño). El último resultado y las preguntas ya vistas quedan en el `localStorage` del navegador, separados por perfil.
- **Estático (GitHub Pages o `python3 -m http.server`):** sin perfiles; carga los JSON de `data/` y guarda todo en `localStorage`. El frontend detecta solo si hay servidor (`/api/health`).

### Local con servidor

```bash
python3 -m venv .venv && .venv/bin/pip install -r server/requirements.txt
.venv/bin/python -m server.import_banks --all --owner Fran
.venv/bin/uvicorn server.app:app --reload --port 8000
```

La base queda en `var/examen.db` (fuera de git).

## Raspberry Pi

Abrir desde cualquier dispositivo de la red: `http://raspy.local:8080` (la IP puede cambiar; el nombre no).

Corre como servicio de usuario systemd (`deploy/examen-app.service`) y arranca solo al prender la Pi. Para actualizar, desde la Mac:

```bash
git push
./scripts/update_raspberry.sh            # trae el código, instala dependencias y reinicia
./scripts/update_raspberry.sh --import   # además recarga los bancos de data/banks/*.json
```

La primera vez el script crea el entorno, importa los bancos y registra el servicio. Ver logs en la Pi: `journalctl --user -u examen-app -f`.

## Bancos

- `data/banks.json`: lista de bancos que aparecen en el selector (id, título, materia, descripción y archivo).
- `data/banks/<id>.json`: preguntas de cada banco.
- `server/import_banks.py`: carga esos JSON en la base del servidor (valida ids, opciones y respuesta correcta).

| Banco | Origen |
| --- | --- |
| `ingenieria-software-parcial2` | Microsoft Forms curados con `scripts/ingenieria_software/` y `knowledge/ingenieria_software/`. 175 preguntas (M3: 88, M4: 87). |
| `auditoria-parcial2` | Lecturas M3 y M4 de Auditoría + preguntero de Studocu; fuente en `facu/auditoria_de_sistemas/parcial2-quiz/scripts/`. |
| `bd2-parcial2` | Lecturas M3 y M4 de Bases de Datos II + 3 pregunteros de Studocu; fuente en `facu/base_de_datos_2/parcial2-quiz/scripts/`. 366 preguntas (M3: 184, M4: 182). |
| `soa-parcial2` | Lecturas de SOA; fuente en `facu/sistemas_operativos_avanzados/parcial2-quiz/scripts/`. |

### Agregar una materia

1. En la carpeta de la materia, crear un script que use `scripts/bank_builder.py` (formato documentado ahí):

   ```python
   import sys; sys.path.insert(0, "/ruta/a/examen-app/scripts")
   from bank_builder import Bank
   bank = Bank("aud", sources={"M1L1": "Módulo 1 - Lectura 1"})
   q = bank.q
   q("M1L1", "Tema", "¿Enunciado?", "Correcta.", ["Incorrecta 1.", "Incorrecta 2.", "Incorrecta 3.", "Incorrecta 4."], "Justificación.")
   bank.build("auditoria-parcial1", "Banco para practicar ...")
   ```

2. Agregar la entrada en `data/banks.json`.
3. Al generar, `build()` avisa si la respuesta correcta suele ser la opción más larga o la más corta (señal de que se delata por el largo).

a `Opción 1`.
- Se eliminaron duplicados y se conservó la primera aparición.

## Funcionamiento

- Sortea 20 preguntas al azar del banco elegido.
- Randomiza el orden de las opciones.
- Muestra feedback inmediato.
- Guarda el último resultado en `localStorage`.
- Muestra justificación y fuente de lectura por respuesta.
