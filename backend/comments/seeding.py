import json

from django.conf import settings
from django.db import transaction
from django.utils.dateparse import parse_datetime

from .models import Comment

DATA_FILE = settings.BASE_DIR / "data" / "comments.json"


@transaction.atomic
def load_seed() -> int:
    """Replace all comments with the records from ``data/comments.json``.

    Shared by the ``seed_comments`` command and the ``reset`` API action.
    Returns the number of comments loaded.
    """
    records = json.loads(DATA_FILE.read_text())["comments"]

    Comment.objects.all().delete()
    Comment.objects.bulk_create(
        Comment(
            author=record["author"],
            text=record["text"],
            date=parse_datetime(record["date"]),
            likes=record["likes"],
            image=record.get("image", ""),
        )
        for record in records
    )

    return len(records)
