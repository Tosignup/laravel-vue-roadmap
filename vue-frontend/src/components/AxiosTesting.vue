<script setup lang="ts">
import { useAxios } from '@/composables/useAxios';

const { posts, loading} = useAxios();
</script>
<template>
  <p v-if="loading">loading...</p>
  <ul>
    <li v-for="post in posts" :key="post.id">
      <span>{{ post.title }}</span>
      {{ post.body }}
    </li>
  </ul>

</template>
