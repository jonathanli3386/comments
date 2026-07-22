"use client";

import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { AddComment } from "@/lib/types";

export function CommentForm({
  onSubmit,
}: {
  onSubmit: AddComment;
}) {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const trimmed = text.trim();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!trimmed || submitting) return;
    setSubmitting(true);
    try {
      await onSubmit(trimmed);
      setText("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 py-4">
      <Avatar className="size-10">
        <AvatarFallback className="bg-brand font-mono font-semibold text-brand-foreground">
          A
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2">
        <Textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Add a comment as Admin…"
          rows={2}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={!trimmed || submitting}>
            {submitting ? "Posting…" : "Comment"}
          </Button>
        </div>
      </div>
    </form>
  );
}
