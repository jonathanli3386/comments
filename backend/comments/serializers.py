from rest_framework import serializers

from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    """API representation of a :class:`~comments.models.Comment`.

    To expose a new model field, add it to ``fields`` (and to
    ``read_only_fields`` unless clients should be allowed to write it).
    """

    class Meta:
        model = Comment
        fields = ["id", "author", "text", "date", "likes", "image"]
        # Only `text` is client-writable. `author` and `date` are set by the
        # server on create; `id`, `likes`, and `image` are never edited here.
        read_only_fields = ["id", "author", "date", "likes", "image"]
