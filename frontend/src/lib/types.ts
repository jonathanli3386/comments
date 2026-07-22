export interface Comment {
  id: number;
  author: string;
  text: string;
  /** ISO 8601 timestamp. */
  date: string;
  likes: number;
  /** Avatar URL; may be an empty string. */
  image: string;
}

/**
 * Mutation handlers exposed by `useComments` and passed down to components.
 * Extracted here so the hook and every component share one contract — add a
 * new mutation (e.g. `LikeComment`) in one place and wire it through.
 */
export type AddComment = (text: string) => Promise<void>;
export type EditComment = (id: number, text: string) => Promise<void>;
export type DeleteComment = (id: number) => Promise<void>;
export type ResetComments = () => Promise<void>;
