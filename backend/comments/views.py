from django.utils import timezone
from rest_framework import viewsets

from .models import Comment
from .serializers import CommentSerializer


class CommentViewSet(viewsets.ModelViewSet):
    """List, create, edit, and delete comments."""

    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        # New comments are always posted by "Admin" at the current time.
        serializer.save(author="Admin", date=timezone.now())
