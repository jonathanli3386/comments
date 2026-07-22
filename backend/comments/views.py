from django.utils import timezone
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Comment
from .seeding import load_seed
from .serializers import CommentSerializer

# Author attributed to every comment created through the API. The model allows
# any author (see the seed data), but the public API always posts as the site
# owner. Change it here to re-brand the poster.
DEFAULT_AUTHOR = "Admin"


class CommentViewSet(viewsets.ModelViewSet):
    """CRUD endpoints for comments, served under ``/api/comments/``.

    Extension seams:
      * add a custom endpoint (e.g. ``like`` / ``reply``) with a DRF ``@action``;
      * add filtering/search via ``filter_backends`` + ``filterset_fields``.
    """

    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer: CommentSerializer) -> None:
        # Server-controlled fields: author and date are read-only in the
        # serializer, so the client cannot override what we set here.
        serializer.save(author=DEFAULT_AUTHOR, date=timezone.now())

    @action(detail=False, methods=["post"])
    def reset(self, request) -> Response:
        """Wipe all comments and reload the original seed data.

        Served at ``POST /api/comments/reset/``; returns the fresh list.
        """
        load_seed()
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(serializer.data)
