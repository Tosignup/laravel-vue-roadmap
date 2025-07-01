<script setup lang="ts">
  import { ref } from 'vue';

  const emit = defineEmits<{
    (e: 'submit', payload: { email: string; password: string;}): void ;
  }>();

  const email = ref<string>('');
  const password = ref<string>('');

  function handleSubmit()
  {
    emit('submit', {
      email: email.value,
      password: password.value,
    });
  }

</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button type="submit">Login</button>
  </form>
</template>

