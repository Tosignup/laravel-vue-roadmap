import { ref } from "vue";
import { api } from './useAxios';
import type { Book, BookResponse } from "@/types/Book";

const books = ref<Book[]>([]);
const loading = ref<boolean>(false);

export function useBooks() {
  const fetchBooks = async () => {
    const res = await api.get('/api/books');
    books.value = res.data.data;
  };

  const createBook = async (book: Book) => {

      await api.post('/api/books', book);
    await fetchBooks();
  }

  const showBook = async (id: number, book: Book) => {
    await api.get<BookResponse>(`/api/books/${id}`);
  }

  const updateBook = async (id: number, book: Book) => {
    loading.value = true;
     await api.put(`/api/books/${id}`, book);
    await fetchBooks();
    loading.value = false;
  }

  const deleteBook = async (id: number) => {
    await api.delete(`/api/books/${id}`);
    await fetchBooks();
  }

  return { books, loading, fetchBooks, createBook, updateBook, deleteBook };
}
