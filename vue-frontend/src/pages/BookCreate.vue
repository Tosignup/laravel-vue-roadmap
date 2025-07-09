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
  <BookForm v-model="book"/>
</template>
