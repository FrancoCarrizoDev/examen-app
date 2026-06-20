#!/usr/bin/env bash
set -euo pipefail

RASPBERRY_HOST="${RASPBERRY_HOST:-fran@192.168.0.86}"
APP_DIR="${APP_DIR:-/home/fran/parcial2-quiz}"

ssh "$RASPBERRY_HOST" "cd '$APP_DIR' && git pull --ff-only && git status --short --branch"
