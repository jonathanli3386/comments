import { CommentList } from "@/components/comment-list";

export default function Home() {
  return (
    <>
      <header className="border-b border-white/10 bg-black">
        <div className="mx-auto flex max-w-2xl items-center gap-2 px-4 py-4">
          <span className="size-2.5 rounded-full bg-brand" />
          <span className="font-mono text-sm font-medium uppercase tracking-widest text-white">
            Comments
          </span>
        </div>
      </header>
      <main className="mx-auto w-full max-w-2xl px-4 py-8">
        <CommentList />
      </main>
    </>
  );
}
