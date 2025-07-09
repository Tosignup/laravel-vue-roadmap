<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { api } from '@/composables/useAxios';
import BookForm from './BookForm.vue';
import type { Book } from '@/types/Book';

const route = useRoute();
const book = ref<Book>({
  title: '',
  author: '',
  genre: '',
  status: 'To Read'
});

onMounted(async () => {
  const res = await api.get(`/api/books/${route.params.id}`);
  book.value = res.data.data;
  console.log(book.value);
});
</script>

<template>
  <BookForm v-model="book" />
</template>
