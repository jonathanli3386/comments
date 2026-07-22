#!/usr/bin/env bash
#
# One-command setup + run for the Comments app.
# Installs dependencies, prepares and seeds the database, and starts the
# Django API and the Next.js frontend together.
#
#   ./start.sh           normal start (seeds only on first run)
#   ./start.sh --fresh   reset the database and re-seed from comments.json
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"

# --- Prerequisites ---------------------------------------------------------
if ! command -v uv >/dev/null 2>&1; then
  echo "✗ 'uv' is required (Python package manager)."
  echo "  Install it: curl -LsSf https://astral.sh/uv/install.sh | sh"
  exit 1
fi
if ! command -v npm >/dev/null 2>&1; then
  echo "✗ 'node' and 'npm' are required (Node.js 20+)."
  echo "  Install from https://nodejs.org"
  exit 1
fi

# --- Backend setup ---------------------------------------------------------
echo "▶ Backend: installing dependencies…"
( cd backend && uv sync )

# Seed on the first run (no database yet) or whenever --fresh is passed.
need_seed=0
if [ ! -f backend/db.sqlite3 ]; then need_seed=1; fi
if [ "${1:-}" = "--fresh" ]; then
  rm -f backend/db.sqlite3
  need_seed=1
fi

echo "▶ Backend: applying migrations…"
( cd backend && uv run python manage.py migrate )

if [ "$need_seed" -eq 1 ]; then
  echo "▶ Backend: seeding comments from data/comments.json…"
  ( cd backend && uv run python manage.py seed_comments )
fi

# --- Frontend setup --------------------------------------------------------
echo "▶ Frontend: installing dependencies…"
( cd frontend && npm install )

if [ ! -f frontend/.env.local ]; then
  cp frontend/.env.local.example frontend/.env.local
  echo "▶ Frontend: created .env.local"
fi

# --- Run both --------------------------------------------------------------
# Stop both servers when this script exits (e.g. Ctrl-C).
trap 'kill 0' EXIT

echo
echo "✓ Starting servers — press Ctrl-C to stop both."
echo "    API      → http://localhost:8000/api/comments/"
echo "    Frontend → http://localhost:3000"
echo

( cd backend && uv run python manage.py runserver ) &
( cd frontend && npm run dev ) &
wait
