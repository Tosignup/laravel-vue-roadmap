<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore';

const name = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const password_confirmation = ref<string>('');
const errorMsg = ref<string>('');
const loading = ref<boolean>(false);

const auth = useAuthStore();
const router = useRouter();

const handleRegister = async() => {
  loading.value = true;
  errorMsg.value = '';

  try {
    await auth.register({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value
    });
    router.push('/books');
  } catch (err: any ){
    if (err.response?.status === 422){
      errorMsg.value = Object.values(err.response.data.errors).flat().join(', ');
    } else {
      errorMsg.value = 'Registration failed. Please try again.';
    }

  } finally {
    loading.value = false;
  }
}
</script>
<template>
  <form @submit.prevent="handleRegister" class="max-w-sm mx-auto space-y-4">
    <h2 class="text-2xl font-bold">Create a New Account</h2>
     <input type="text"
      v-model="name"
      placeholder="Full Name"
      class="w-full border p-2 rounded"
      required
    >
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
     <input type="password"
      v-model="password_confirmation"
      placeholder="Retype Password"
      class="w-full border p-2 rounded"
      required
    >
    <button type="submit"
    class="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50" :disabled="loading">
      {{ loading ? 'Registering...' : 'Register' }}
    </button>
    <p v-if="errorMsg" class="text-red-500 text-sm">{{ errorMsg }}</p>
  </form>

</template>
