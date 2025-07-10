<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';

const email = ref<string>('');
const password = ref<string>('');
const errorMsg = ref<string>('');
const loading = ref<boolean>(false);

const auth = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  loading.value = true;
  errorMsg.value = '';

  try {
    await auth.login(email.value, password.value);
    router.push('/books');
  } catch (err: any) {
    if (err.response?.status === 401) {
      errorMsg.value = 'Invalid credentials';
    } else {
      errorMsg.value = 'Login failed. Please try again!';
    }
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <form @submit.prevent="handleLogin" class="max-w-sm mx-auto space-y-4">
    <h2 class="text-2xl font-bold">Login</h2>
    <input type="email"
      v-model="email"
      placeholder="Email"
      class="w-full border p-2 rounded"
      required
    >
     <input type="password"
      v-model="password"
      placeholder="Password"
      class="w-full border p-2 rounded"
      required
    >
    <button type="submit"
    class="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50" :disabled="loading">
      {{ loading ? 'Logging in..' : 'Login' }}
    </button>
    <p v-if="errorMsg" class="text-red-500 text-sm">{{ errorMsg }}</p>
  </form>

</template>
