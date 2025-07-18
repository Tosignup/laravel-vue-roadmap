import { ref } from 'vue';
import { api } from '@/composables/useAxios';
import type { Book } from '@/types/Book';
import { defineStore } from 'pinia';

export const useBookStore = defineStore('book', () => {
  const books = ref<Book[]>([]);
  const meta = ref<any>(null);
  const loading = ref<boolean>(false);

  const fetchBooks = async (search = '', page = 1) => {
    loading.value = true;
    const res = await api.get('/api/books', {
      params: { search, page},
    });
    // console.log(res.data);
    books.value = res.data.data;
    meta.value = res.data.meta;
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

  return { books, meta, loading, fetchBooks, addBook, updateBook, deleteBook };

})
