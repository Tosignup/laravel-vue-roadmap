<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Book } from '@/types/Book';

const props = defineProps<{
  modelValue: Book;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: Book): void;
}>();

const localBook = ref({ ...props.modelValue });
watch( localBook, (val) => emit('update:modelValue', val), {deep: true});
</script>

<template>
  <form class="space-y-4">
    <input v-model="localBook.title" placeholder="Title" class="input" />
    <input v-model="localBook.author" placeholder="Author" class="input" />
    <input v-model="localBook.genre" placeholder="Genre" class="input" />
    <select v-model="localBook.status" class="input">
      <option>To Read</option>
      <option>Reading</option>
      <option>Read</option>
    </select>
  </form>

</template>

<style scoped>
.input {
  @apply w-full border p-2 rounded;
}
</style>
