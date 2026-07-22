"use client";

import { Pencil } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import type { Comment, EditComment } from "@/lib/types";

export function EditCommentDialog({
  comment,
  onSubmit,
}: {
  comment: Comment;
  onSubmit: EditComment;
}) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(comment.text);
  const [saving, setSaving] = useState(false);

  const trimmed = text.trim();
  const disabled = !trimmed || trimmed === comment.text.trim() || saving;

  // Reset the textarea to the current text each time the dialog opens.
  function handleOpenChange(next: boolean) {
    if (next) setText(comment.text);
    setOpen(next);
  }

  async function handleSave() {
    if (disabled) return;
    setSaving(true);
    try {
      await onSubmit(comment.id, trimmed);
      setOpen(false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={<Button variant="ghost" size="sm" className="h-7 gap-1 px-2" />}
      >
        <Pencil className="size-3.5" />
        Edit
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit comment</DialogTitle>
        </DialogHeader>
        <Textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={4}
          autoFocus
        />
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <Button onClick={handleSave} disabled={disabled}>
            {saving ? "Saving…" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
