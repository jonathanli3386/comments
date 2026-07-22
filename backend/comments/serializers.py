from rest_framework import serializers

from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["id", "author", "text", "date", "likes", "image"]
        # Only `text` is client-writable. `author` and `date` are set by the
        # server on create; `id`, `likes`, and `image` are never edited here.
        read_only_fields = ["id", "author", "date", "likes", "image"]
