import { ThumbsUp } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Comment } from "@/lib/types";
import { formatDate, getInitials } from "@/lib/utils";

export function CommentItem({ comment }: { comment: Comment }) {
  return (
    <article className="flex gap-3 py-4">
      <Avatar className="size-10">
        <AvatarImage src={comment.image} alt={comment.author} />
        <AvatarFallback>{getInitials(comment.author)}</AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="font-medium">{comment.author}</span>
          <time className="text-xs text-muted-foreground">
            {formatDate(comment.date)}
          </time>
        </div>
        <p className="whitespace-pre-wrap text-sm leading-relaxed">{comment.text}</p>
        <div className="flex items-center gap-1.5 pt-1 text-xs text-muted-foreground">
          <ThumbsUp className="size-3.5" />
          {comment.likes}
        </div>
      </div>
    </article>
  );
}
