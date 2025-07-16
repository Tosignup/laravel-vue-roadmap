<script  setup lang="ts">
import { onMounted } from 'vue';
import { useBooks } from '@/composables/useBooks';
import BaseButton from '@/components/BaseButton.vue';
import { useAuthStore } from '@/stores/authStore';
import router from '@/router';

const { books, fetchBooks, deleteBook} =  useBooks();
const auth = useAuthStore();
function logout(){
  auth.logout();
  router.push('/login');
}
onMounted(fetchBooks);
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
          <div v-for="book in books" :key="book.id" class="max-w-md my-2" >
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
      </div>
    </main>
</template>
