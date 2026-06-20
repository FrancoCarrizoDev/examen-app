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

El script entra por SSH a la Raspberry y ejecuta `git pull --ff-only` en `/home/fran/parcial2-quiz`. No copia archivos.

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
