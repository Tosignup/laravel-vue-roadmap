<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Book } from '@/types/Book';
import { useBooks } from '@/composables/useBooks';
import { useRouter } from 'vue-router';

const props = defineProps<{
  modelValue: Book;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: Book): void;
}>();

const localBook = ref<Book>({ ...props.modelValue });
const {createBook, updateBook, loading} = useBooks();
const router = useRouter();

watch( localBook, (val) => emit('update:modelValue', val), {deep: true});

const handleSubmit = async() => {
  try {
    if (localBook.value.id) {
      await updateBook(localBook.value.id, localBook.value);
    } else {
      await createBook(localBook.value);
    }
    router.push('/books');
  } catch (err: any) {
    if (err.response?.status === 422){
    console.error('Validation error: ', err.response.data.errors);
    }

  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <input v-model="localBook.title" placeholder="Title" class="input" required/>
    <input v-model="localBook.author" placeholder="Author" class="input" required/>
    <input v-model="localBook.genre" placeholder="Genre" class="input" />
    <select v-model="localBook.status" class="input">
      <option>To Read</option>
      <option>Reading</option>
      <option>Read</option>
    </select>

    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">{{ localBook.id ? 'Update' : 'Create' }} Book</button>
  </form>

</template>

<style scoped>
.input {
  @apply w-full border p-2 rounded;
}
</style>
