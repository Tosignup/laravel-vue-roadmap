export interface Book {
  id?: number;
  title: string;
  author: string;
  genre?: string;
  status: "To Read" | "Reading" | "Read";
  cover_image?: File | string;
  created_at?: string;
}

export interface BookResponse {
  data: Book;
}
