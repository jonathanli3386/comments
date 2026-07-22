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
