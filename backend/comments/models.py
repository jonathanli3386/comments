from django.db import models
from django.utils import timezone


class Comment(models.Model):
    """A single comment in the YouTube/Reddit-style feed."""

    author = models.CharField(max_length=255)
    text = models.TextField()
    date = models.DateTimeField(default=timezone.now)
    likes = models.PositiveIntegerField(default=0)
    image = models.URLField(blank=True, default="")

    class Meta:
        # Newest first, so a freshly added comment appears at the top.
        ordering = ["-date"]

    def __str__(self) -> str:
        return f"{self.author}: {self.text[:50]}"
