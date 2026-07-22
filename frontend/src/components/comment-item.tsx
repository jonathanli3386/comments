import { ThumbsUp } from "lucide-react";

import { DeleteCommentDialog } from "@/components/delete-comment-dialog";
import { EditCommentDialog } from "@/components/edit-comment-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate, getInitials } from "@/lib/format";
import type { Comment, DeleteComment, EditComment } from "@/lib/types";

export function CommentItem({
  comment,
  onEdit,
  onDelete,
}: {
  comment: Comment;
  onEdit: EditComment;
  onDelete: DeleteComment;
}) {
  return (
    <article className="flex gap-3 py-4">
      <Avatar className="size-10">
        <AvatarImage src={comment.image} alt={comment.author} />
        <AvatarFallback>{getInitials(comment.author)}</AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-sm font-medium">{comment.author}</span>
          <time className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
            {formatDate(comment.date)}
          </time>
        </div>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
          {comment.text}
        </p>
        <div className="flex items-center gap-1 pt-1 text-muted-foreground">
          <span className="flex items-center gap-1.5 pr-2 font-mono text-xs">
            <ThumbsUp className="size-3.5" />
            {comment.likes}
          </span>
          <EditCommentDialog comment={comment} onSubmit={onEdit} />
          <DeleteCommentDialog commentId={comment.id} onConfirm={onDelete} />
        </div>
      </div>
    </article>
  );
}
