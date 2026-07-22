import { CommentList } from "@/components/comment-list";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Comments</h1>
      <CommentList />
    </main>
  );
}
