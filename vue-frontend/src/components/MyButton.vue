<template>
  <button @click="handleClick">Click Me</button>
</template>

<script setup lang="ts">
  function handleClick() {
    alert('Button clicked!');
  }
</script>

<style scoped>
button {
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
}
</style>
