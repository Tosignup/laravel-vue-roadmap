<script  setup lang="ts">
import { onMounted, watch } from 'vue';
import { useBooks } from '@/composables/useBooks';
import BaseButton from '@/components/BaseButton.vue';
import { useAuthStore } from '@/stores/authStore';
import { useBookStore } from '@/stores/bookStore';
import router from '@/router';
import { useDebouncedRef } from '@/composables/useDebouncedRef';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

const bookStore = useBookStore();
const auth = useAuthStore();
const { raw: searchInput, debounced: search } = useDebouncedRef('', 400);

watch(search, () => {
  bookStore.fetchBooks(search.value);
});

const getCoverSrc = (cover: string | File | undefined): string | undefined => {
  if (typeof cover === 'string') {
    return `/storage/${cover}`;
  }
  if (cover instanceof File) {
    return URL.createObjectURL(cover);
  }
  return undefined;
};


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
        <div class="relative">
          <input v-model="searchInput"
            class="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
            placeholder="Search..."
          />
          <div class="absolute left-0 inset-y-0 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 ml-3 text-gray-400 hover:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div v-if="bookStore.loading" class="flex justify-center py-4 my-2">
          <LoadingSpinner />
        </div>

        <div v-else="!bookStore.loading" v-for="book in bookStore.books" :key="book.id" class="min-w-md min-h-lg my-2" >
              <div class="flex gap-3 pr-2 bg-white border border-gray-300 rounded-xl items-center justify-between">

                  <div class="relative w-32 h-32 flex-shrink-0">
                      <img v-if="book.cover_image" class="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50" :src="getCoverSrc(book.cover_image)">
                  </div>
                  <div class="flex justify-start flex-col gap-2 py-2">
                    <span> {{ book.cover_image }}</span>
                      <p class="text-xl font-bold">{{ book.title }}</p>
                      <span class="text-gray-500">
                          {{ book.author }}
                      </span>
                  </div>
                  <div class="flex justify-evenly gap-1">
                    <BaseButton label="Delete" @click="bookStore.deleteBook(book.id!)" type="button" variant="danger"/>
                    <router-link :to="`/books/${book.id}/edit`" class="text-white bg-blue-500 py-2 px-4 rounded">Edit</router-link>
                  </div>
              </div>
          </div>
          <div v-if="bookStore.meta && !bookStore.loading" class="flex gap-2">
            <button @click="bookStore.fetchBooks(search, bookStore.meta.current_page - 1)" :disabled="bookStore.meta.current_page === 1" class="bg-slate-400 text-slate-700 py-2 px-4 rounded disabled:text-slate-200 disabled:bg-slate-300">Prev</button>
            <button @click="bookStore.fetchBooks(search, bookStore.meta.current_page + 1)" :disabled="bookStore.meta.current_page === bookStore.meta.last_page" class="bg-slate-400 text-slate-700 py-2 px-4 rounded disabled:text-slate-200 disabled:bg-slate-300">Next</button>
          </div>
      </div>
    </main>
</template>
