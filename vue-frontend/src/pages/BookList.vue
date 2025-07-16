<script  setup lang="ts">
import { onMounted, watch } from 'vue';
import { useBooks } from '@/composables/useBooks';
import BaseButton from '@/components/BaseButton.vue';
import { useAuthStore } from '@/stores/authStore';
import { useBookStore } from '@/stores/bookStore';
import router from '@/router';
import { useDebouncedRef } from '@/composables/useDebouncedRef';

const { books, fetchBooks, deleteBook} = useBooks();
const bookStore = useBookStore();
const auth = useAuthStore();
const { raw: searchInput, debounced: search } = useDebouncedRef('', 400);

watch(search, () => {
  bookStore.fetchBooks(search.value);
});

function logout(){
  auth.logout();
  router.push('/login');
}
function prev() {

  console.log(bookStore.meta.current_page - 1);
}

onMounted(() => {
  bookStore.fetchBooks(search.value);
});
</script>

<template>
  <header class="bg-white shadow-sm">
      <div class="flex justify-between items-center mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Books List</h1>
        <router-link to="/books/create" class="btn">Add Book</router-link>
      </div>
    </header>
    <main>
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <input v-model="searchInput" placeholder="Search title or author"/>
          <div v-for="book in bookStore.books" :key="book.id" class="max-w-md my-2" >
              <div class="flex gap-3 bg-white border border-gray-300 rounded-xl overflow-hidden items-center justify-between">
                  <div class="relative w-32 h-32 flex-shrink-0">
                      <img class="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50" loading="lazy" src="">
                  </div>
                  <div class="flex justify-start flex-col gap-2 py-2">
                      <p class="text-xl font-bold">{{ book.title }}</p>
                      <span class="text-gray-500">
                          {{ book.author }}
                      </span>
                  </div>
                  <div class="flex justify-evenly gap-1">
                    <BaseButton label="Delete" @click="deleteBook(book.id!)" type="button" variant="danger"/>
                    <router-link :to="`/books/${book.id}/edit`" class="text-white bg-blue-500 py-2 px-4 rounded">Edit</router-link>
                  </div>
              </div>
          </div>
          <div v-if="bookStore.meta" class="flex gap-2">
            <button @click="bookStore.fetchBooks(search, bookStore.meta.current_page - 1)" :disabled="bookStore.meta.current_page === 1" class="bg-slate-400 text-slate-700 py-2 px-4 rounded disabled:text-slate-200 disabled:bg-slate-300">Prev</button>
            <button @click="bookStore.fetchBooks(search, bookStore.meta.current_page + 1)" :disabled="bookStore.meta.current_page === bookStore.meta.last_page" class="bg-slate-400 text-slate-700 py-2 px-4 rounded disabled:text-slate-200 disabled:bg-slate-300">Next</button>
          </div>
      </div>
    </main>
</template>
