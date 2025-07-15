<script setup lang="ts">
import { ref } from 'vue';
import BookForm from './BookForm.vue';
import type { Book } from '@/types/Book';

const book = ref<Book>({
  title: '',
  author: '',
  genre: '',
  status: 'To Read'
});

</script>
<template>
  <!-- <BookCreate v-model="book" /> -->
   <header class="bg-white shadow-sm">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Store Book</h1>
      </div>
    </header>
    <main>
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <BookForm v-model="book"/>
      </div>
    </main>
</template>
