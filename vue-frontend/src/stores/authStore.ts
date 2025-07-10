import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "@/composables/useAxios";

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);

  const login = async (email: string, password: string) => {
    await api.get('/sanctum/csrf-cookie');
    const res = await api.post('/api/login', {email, password});
    user.value = res.data;
  }

  const logout = async () => {
    await api.post('/api/logout');
    user.value = null;
  }

  return { user, login, logout};
});
