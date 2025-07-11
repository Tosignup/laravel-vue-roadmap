import {defineStore} from 'pinia';
import { ref } from 'vue';
import type { Book } from '@/types/Book';
import { api } from '@/composables/useAxios';

export const useBookStore = defineStore('book', () => {
  const books = ref<Book[]>([]);
  const loading = ref<boolean>(false);

  const fetchBooks = async () => {
    loading.value = true;
    const res = await api.get('/api/books');
    books.value = res.data.data;
    loading.value = false;
  };

  const addBook = async (book: Book) => {
    await api.post('/api/books', book);
    await fetchBooks();
  }

  const updateBook = async (id: number, book: Book) => {
      await api.put(`/api/books/${id}`, book);
    await fetchBooks();
  }

  const deleteBook = async (id: number) => {
    await api.delete(`/api/books/${id}`);
    await fetchBooks();
  }

  return { books, loading, fetchBooks, addBook, updateBook, deleteBook };

})
