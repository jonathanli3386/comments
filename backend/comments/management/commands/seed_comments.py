from django.core.management.base import BaseCommand

from comments.seeding import load_seed


class Command(BaseCommand):
    help = "Load comments from data/comments.json into a fresh database."

    def handle(self, *args, **options):
        count = load_seed()
        self.stdout.write(self.style.SUCCESS(f"Seeded {count} comments."))
