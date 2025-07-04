<script setup lang="ts">
  import LoginForm from './components/LoginForm.vue';
  import { useMouse, useMouseWithEventListener } from './composables/useMouse';

  const { x: mouseX, y:mouseY} = useMouseWithEventListener();
  const handleLogin = (payload: {email: string, password: string}) => {
    console.log(payload);
  }
</script>

<template>
  <!-- <LoginForm @submit="handleLogin" /> -->
   <h1>Mouse position is at: {{ mouseX }} - {{ mouseY }}</h1>
</template>
