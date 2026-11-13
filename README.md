# examen-app

Simulador de parciales multiple choice para varias materias. Se elige la materia y el parcial en el selector de arriba (o con `?bank=<id>` en la URL).

## Cómo usar

Desde esta carpeta:

```bash
python3 -m http.server 8000
```

Después abrir:

```text
http://localhost:8000
```

Nota: si abrís `index.html` con doble click, algunos navegadores bloquean la carga de `data/questions.json` por `file://`.

## Raspberry Pi

La app está pensada para servirse como sitio estático. En la Raspberry:

```bash
cd /home/fran/parcial2-quiz
python3 -m http.server 8080 --bind 0.0.0.0
```

Abrir desde cualquier dispositivo de la red:

```text
http://192.168.0.86:8080
```

### Flujo de actualización con Git

Desde la Mac:

```bash
git add .
git commit -m "mensaje"
git push
./scripts/update_raspberry.sh
```

El script entra por SSH a la Raspberry y ej## Bancos

- `data/banks.json`: lista de bancos que aparecen en el selector (id, título, materia, descripción y archivo).
- `data/banks/<id>.json`: preguntas de cada banco.
- Cada banco guarda su último resultado por separado en `localStorage`.

| Banco | Origen |
| --- | --- |
| `ingenieria-software-parcial2` | Microsoft Forms curados con `scripts/ingenieria_software/` y `knowledge/ingenieria_software/`. 175 preguntas (M3: 88, M4: 87). |
| `auditoria-parcial2` | Lecturas M3 y M4 de Auditoría + preguntero de Studocu; fuente en `facu/auditoria_de_sistemas/parcial2-quiz/scripts/`. |
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
