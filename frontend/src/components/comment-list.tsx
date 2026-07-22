"use client";

import { CommentForm } from "@/components/comment-form";
import { CommentItem } from "@/components/comment-item";
import { ResetDialog } from "@/components/reset-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useComments } from "@/hooks/use-comments";

export function CommentList() {
  const { comments, loading, error, reload, add, edit, remove, reset } =
    useComments();

  return (
    <section>
      <CommentForm onSubmit={add} />

      {loading && <CommentListSkeleton />}

      {error && (
        <div className="py-8 text-center">
          <p className="text-sm text-red-600">{error}</p>
          <Button variant="outline" size="sm" className="mt-3" onClick={reload}>
            Try again
          </Button>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="flex items-center justify-between border-t py-4">
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {comments.length} {comments.length === 1 ? "comment" : "comments"}
            </h2>
            <ResetDialog onConfirm={reset} />
          </div>
          {comments.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No comments yet. Be the first to comment.
            </p>
          ) : (
            <div className="divide-y">
              {comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onEdit={edit}
                  onDelete={remove}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}

function CommentListSkeleton() {
  return (
    <div className="space-y-6 border-t py-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="flex gap-3">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
