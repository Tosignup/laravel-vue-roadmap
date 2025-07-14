<script  setup lang="ts">
import { onMounted } from 'vue';
import { useBooks } from '@/composables/useBooks';

const { books, fetchBooks, deleteBook} =  useBooks();

onMounted(fetchBooks);
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
    <router-link to="/books/create" class="btn">Add Book</router-link>
    <div v-for="book in books" :key="book.id" class="p-4 border rounded">
      <h2 class="font-bold"> {{ book.title }}</h2>
      <p> {{ book.author }} - {{ book.genre }}</p>
      <button @click="deleteBook(book.id!)" class="text-red-500">Delete</button>
      <router-link :to="`/books/${book.id}/edit`" class="text-blue-500">Edit</router-link>
    </div>
  </div>
</template>
