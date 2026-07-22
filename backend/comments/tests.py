from django.core.management import call_command
from django.test import TestCase
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Comment


class CommentAPITests(APITestCase):
    def setUp(self):
        self.comment = Comment.objects.create(author="Joe", text="Original", likes=5)

    def test_list_returns_all_comments(self):
        Comment.objects.create(author="Jane", text="Another")
        response = self.client.get("/api/comments/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_create_forces_admin_author_and_current_time(self):
        before = timezone.now()
        response = self.client.post(
            "/api/comments/",
            {"text": "New comment", "author": "Hacker", "likes": 999},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        created = Comment.objects.get(id=response.data["id"])
        self.assertEqual(created.author, "Admin")
        self.assertEqual(created.likes, 0)
        self.assertGreaterEqual(created.date, before)

    def test_edit_updates_only_text(self):
        response = self.client.patch(
            f"/api/comments/{self.comment.id}/",
            {"text": "Edited", "author": "Hacker", "likes": 999},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.comment.refresh_from_db()
        self.assertEqual(self.comment.text, "Edited")
        self.assertEqual(self.comment.author, "Joe")
        self.assertEqual(self.comment.likes, 5)

    def test_delete_removes_comment(self):
        response = self.client.delete(f"/api/comments/{self.comment.id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Comment.objects.filter(id=self.comment.id).exists())


class SeedCommandTests(TestCase):
    def test_seed_loads_all_comments(self):
        call_command("seed_comments")
        self.assertEqual(Comment.objects.count(), 16)
