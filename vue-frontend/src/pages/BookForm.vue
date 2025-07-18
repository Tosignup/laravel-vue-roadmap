<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { Book } from '@/types/Book';
import { useBooks } from '@/composables/useBooks';
import { useRouter } from 'vue-router';
import { useBookStore } from '@/stores/bookStore';

const props = defineProps<{
  modelValue: Book;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: Book): void;
}>();

const localBook = ref<Book>({ ...props.modelValue });
watch(() => props.modelValue, (newVal) => {
  if(newVal){
    Object.assign(localBook.value, newVal);
  }
}, { immediate: true});
const {createBook, updateBook, loading} = useBooks();
const router = useRouter();

const bookStore = useBookStore();
watch( localBook, (val) => emit('update:modelValue', val), { deep: true });

const handleCoverChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];

  if(file) localBook.value.cover_image = file;
};

const previewUrl = computed((): string | undefined => {
  if (typeof localBook.value.cover_image === 'string') {
    return `/storage/${localBook.value.cover_image}`;
  }
  if (localBook.value.cover_image instanceof File) {
    return URL.createObjectURL(localBook.value.cover_image);
  }

  return undefined;
});

watch(() => localBook.value.cover_image, (newFile, _, onCleanup) => {
  if(newFile instanceof File) {
    const url = URL.createObjectURL(newFile);
    onCleanup(() => URL.revokeObjectURL(url));
  }
});

const handleSubmit = async() => {
  try {
    const formData = new FormData();

   Object.entries(localBook.value).forEach(([key, val]) => {
    if (key === 'cover_image' && val instanceof File){
      formData.append('cover_image', val);
    } else if (typeof val === 'string') {
      formData.append(key, val);
    }
   });
    console.log('Updating book with ID:', localBook.value.id);
   if(localBook.value.id) {
    await bookStore.updateBook(localBook.value.id, formData);
   } else {
    await bookStore.createBook(formData);
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
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <input v-model="localBook.title" placeholder="Title" class="input"/>
      <input v-model="localBook.author" placeholder="Author" class="input"/>
      <input v-model="localBook.genre" placeholder="Genre" class="input" />
      <select v-model="localBook.status" class="input">
        <option>To Read</option>
        <option>Reading</option>
        <option>Read</option>
      </select>

      <input type="file" accept="image/*" @change="handleCoverChange" class="input" />
      <div v-if="previewUrl">
        <img :src="previewUrl" alt="Preview" class="w-32 h-32 object-cover rounded shadow" />
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">{{ localBook.id ? 'Update' : 'Create' }} Book</button>
    </form>
  </div>
</template>

<style scoped>
.input {
  @apply w-full border p-2 rounded;
}
</style>
