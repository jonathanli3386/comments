import type { Comment } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Request to ${path} failed with status ${response.status}`);
  }

  // DELETE returns 204 No Content, so there is no body to parse.
  return response.status === 204 ? (undefined as T) : response.json();
}

export function getComments(): Promise<Comment[]> {
  return request<Comment[]>("/comments/");
}

export function createComment(text: string): Promise<Comment> {
  return request<Comment>("/comments/", {
    method: "POST",
    body: JSON.stringify({ text }),
  });
}

export function updateComment(id: number, text: string): Promise<Comment> {
  return request<Comment>(`/comments/${id}/`, {
    method: "PATCH",
    body: JSON.stringify({ text }),
  });
}

export function deleteComment(id: number): Promise<void> {
  return request<void>(`/comments/${id}/`, { method: "DELETE" });
}
