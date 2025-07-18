<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { api } from '@/composables/useAxios';
import BookForm from './BookForm.vue';
import type { Book } from '@/types/Book';
import { useAttrs } from 'vue';

const attr = useAttrs();
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
});
</script>

<template>
    <div class="bg-white shadow-sm">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Book Edit</h1>
      </div>
    </div>
    <div>
      <div v-bind="attr" class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <BookForm v-model="book" />
      </div>
    </div>
</template>
