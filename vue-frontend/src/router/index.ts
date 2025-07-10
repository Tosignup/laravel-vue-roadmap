import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookList from '@/pages/BookList.vue'
import BookEdit from '@/pages/BookEdit.vue'
import BookCreate from '@/pages/BookCreate.vue'

const routes: RouteRecordRaw[] = [
  {path: '/', redirect: '/books' },
  {path: '/books', name: 'BookList', component: BookList},
  {path: '/books/create', name: 'BookCreate', component: BookCreate},
  {path: '/books/:id/edit', name: 'BookEdit', component: BookEdit, props: true},

]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
