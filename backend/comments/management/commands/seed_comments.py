import json

from django.conf import settings
from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils.dateparse import parse_datetime

from comments.models import Comment

DATA_FILE = settings.BASE_DIR / "data" / "comments.json"


class Command(BaseCommand):
    help = "Load comments from data/comments.json into a fresh database."

    @transaction.atomic
    def handle(self, *args, **options):
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

        self.stdout.write(self.style.SUCCESS(f"Seeded {len(records)} comments."))
