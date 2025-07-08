export interface Book {
  id?: number;
  title: string;
  author: string;
  genre?: string;
  status: "To Read" | "Reading" | "Read";
  cover_image?: string;
  created_at?: string;
}
