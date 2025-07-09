import { ref } from "vue";
import { api } from './useAxios';
import type { Book } from "@/types/Book";

const books = ref<Book[]>([]);

export function useBooks() {
  const fetchBooks = async () => {
    const res = await api.get('/books');
    books.value = res.data.data;
  };

  const createBook = async (book: Book) => {
    await api.post('/books', book);
    await fetchBooks();
  }

  const showBook = async (id: number, book: Book) => {
    await api.get(`/books/${id}`);
  }

  const updateBook = async (id: number, book: Book) => {
    await api.put(`/books/${id}`, book);
    await fetchBooks();
  }

  const deleteBook = async (id: number) => {
    await api.delete(`/books/${id}`);
    await fetchBooks();
  }

  return { books, fetchBooks, createBook, updateBook, deleteBook };
}
