<script setup lang="ts">
  import LoginForm from './components/LoginForm.vue';
  const handleLogin = (payload: {email: string, password: string}) => {
    console.log(payload);
  }
</script>

<template>
  <LoginForm @submit="handleLogin" />
</template>
