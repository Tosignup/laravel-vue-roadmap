import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import BookList from '@/pages/BookList.vue'
import BookEdit from '@/pages/BookEdit.vue'
import BookCreate from '@/pages/BookCreate.vue'
import LoginForm from '@/components/LoginForm.vue'

const routes: RouteRecordRaw[] = [
  {path: '/', redirect: '/books' },
  {path: '/books', name: 'BookList', component: BookList},
  {path: '/books/create', name: 'BookCreate', component: BookCreate},
  {path: '/books/:id/edit', name: 'BookEdit', component: BookEdit, props: true},
  {path: '/login', name: 'Login', component: LoginForm}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
