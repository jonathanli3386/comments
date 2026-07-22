# Comments

A small full-stack comments feed (YouTube/Reddit style): list, add, edit, and
delete comments. Built for the Bobyard take-home.

- **Backend** — Django REST Framework + SQLite, dependencies managed with
  [uv](https://docs.astral.sh/uv/).
- **Frontend** — Next.js (App Router) + TypeScript + Tailwind + shadcn/ui,
  styled after [bobyard.com](https://www.bobyard.com).

The 16 seed comments come from `backend/data/comments.json`.

## Prerequisites

- **uv** (installs Python + backend dependencies) — `curl -LsSf https://astral.sh/uv/install.sh | sh`
- **Node.js 20+** and npm

## Run the backend

```bash
cd backend
uv sync                              # create the venv and install dependencies
uv run python manage.py migrate      # create the SQLite database
uv run python manage.py seed_comments # load the 16 comments from the JSON
uv run python manage.py runserver    # serve at http://localhost:8000
```

The API is now at `http://localhost:8000/api/comments/`. Re-running
`seed_comments` resets the table to the original data.

## Run the frontend

In a second terminal:

```bash
cd frontend
npm install
cp .env.local.example .env.local     # points NEXT_PUBLIC_API_URL at the backend
npm run dev                          # serve at http://localhost:3000
```

Open http://localhost:3000 with the backend running.

## API

| Method   | Endpoint               | Description                                    |
| -------- | ---------------------- | ---------------------------------------------- |
| `GET`    | `/api/comments/`       | List all comments (newest first)               |
| `POST`   | `/api/comments/`       | Add a comment — server sets author `Admin` + current time |
| `PATCH`  | `/api/comments/{id}/`  | Edit a comment's `text`                        |
| `DELETE` | `/api/comments/{id}/`  | Delete a comment                               |

Run the backend tests with `uv run python manage.py test`.

## Notes & decisions

- New comments are always authored by **Admin** with the current server time;
  `author`, `date`, and `likes` are read-only over the API so the client
  can't spoof them. Editing changes only the `text`.
- `image` is treated as the commenter's avatar (with initials as a fallback),
  matching the seed data and the YouTube/Reddit framing.
- Deletes are hard deletes.

## If I had more time

- **Deploy**: frontend to Vercel; backend to Render/Railway/Fly with managed
  Postgres (swap SQLite via a `DATABASE_URL` setting).
- Pagination, real authentication (drop the Admin pretend), optimistic UI
  updates, a working like button, and nested replies.
