"use client";

import { useCallback, useEffect, useState } from "react";

import { createComment, getComments, updateComment } from "@/lib/api";
import type { Comment } from "@/lib/types";

const LOAD_ERROR = "Could not load comments. Is the backend running?";

export function useComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(
    () =>
      getComments()
        .then(setComments)
        .catch(() => setError(LOAD_ERROR))
        .finally(() => setLoading(false)),
    [],
  );

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    return fetchComments();
  }, [fetchComments]);

  const add = useCallback(async (text: string) => {
    const created = await createComment(text);
    setComments((prev) => [created, ...prev]);
  }, []);

  const edit = useCallback(async (id: number, text: string) => {
    const updated = await updateComment(id, text);
    setComments((prev) => prev.map((c) => (c.id === id ? updated : c)));
  }, []);

  return { comments, loading, error, reload, add, edit };
}
