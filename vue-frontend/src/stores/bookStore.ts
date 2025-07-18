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
    // await new Promise(resolve => setTimeout(resolve, 1000));
    const res = await api.get('/api/books', {
      params: { search, page},
    });
    books.value = res.data.data;
    meta.value = res.data.meta;
    loading.value = false;
  };

    const createBook = async (formData: FormData) => {

      await api.post('/api/books', formData);
    await fetchBooks();
  }

  const updateBook = async (id: number, formData: FormData) => {
      loading.value = true;
      const res = await api.post(`/api/books/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        params: { _method: 'PUT'},
       });
      loading.value = false;
      return res.data
  }

  const deleteBook = async (id: number) => {
    await api.delete(`/api/books/${id}`);
    await fetchBooks();
  }

  return { books, meta, loading, fetchBooks, createBook, updateBook, deleteBook };

})
