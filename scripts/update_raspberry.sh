#!/usr/bin/env bash
# Actualiza la app en la Raspberry: trae el código, instala dependencias y reinicia el servicio.
# La primera vez también crea el entorno, importa los bancos y registra el servicio.
#
# Uso:
#   ./scripts/update_raspberry.sh              # actualizar código
#   ./scripts/update_raspberry.sh --import     # además reimportar data/banks/*.json (dueño: Fran)
set -euo pipefail

RASPBERRY_HOST="${RASPBERRY_HOST:-fran@raspy.local}"
APP_DIR="${APP_DIR:-/home/fran/parcial2-quiz}"
IMPORT="${1:-}"

ssh "$RASPBERRY_HOST" "APP_DIR='$APP_DIR' IMPORT='$IMPORT' bash -s" <<'REMOTE'
set -euo pipefail
cd "$APP_DIR"
git pull --ff-only

if [ ! -x .venv/bin/python ]; then
  python3 -m venv .venv
fi
.venv/bin/pip install --quiet --disable-pip-version-check -r server/requirements.txt

# Primera vez (sin base) o pedido explícito: cargar los bancos del repo.
if [ ! -f var/examen.db ] || [ "$IMPORT" = "--import" ]; then
  .venv/bin/python -m server.import_banks --all --owner Fran
fi

mkdir -p ~/.config/systemd/user
cp deploy/examen-app.service ~/.config/systemd/user/examen-app.service
systemctl --user daemon-reload
systemctl --user enable --quiet examen-app.service
systemctl --user restart examen-app.service
sleep 2
systemctl --user --no-pager --lines=0 status examen-app.service | head -3
curl -fsS http://localhost:8080/api/health && echo
git status --short --branch
REMOTE
