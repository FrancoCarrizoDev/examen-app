# Parcial 2 Quiz

Mini simulador para estudiar el Parcial 2 de Ingeniería de Software.

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

## Banco

- `data/questions-raw.json`: extracción cruda de los 9 Microsoft Forms.
- `data/questions.json`: banco curado usado por la app.
- Preguntas finales: 175.
- M3: 88 preguntas.
- M4: 87 preguntas.
- Se excluyó `q-109` porque el form solo traía `Opción 1`.
- Se eliminaron duplicados y se conservó la primera aparición.

## Funcionamiento

- Sortea 20 preguntas al azar.
- Randomiza el orden de las opciones.
- Muestra feedback inmediato.
- Guarda el último resultado en `localStorage`.
- Muestra justificación y fuente de lectura por respuesta.
