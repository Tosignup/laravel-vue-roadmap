import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import BookList from '@/pages/BookList.vue'
import BookEdit from '@/pages/BookEdit.vue'
import BookCreate from '@/pages/BookCreate.vue'
import LoginForm from '@/pages/LoginForm.vue'
import RegisterForm from '@/pages/RegisterForm.vue'
import { useAuthStore } from '@/stores/authStore'
import NotFound from '@/pages/NotFound.vue'
import DefaultLayout from '@/components/DefaultLayout.vue'

const routes: RouteRecordRaw[] = [
  {path: '/', redirect: '/books' },
  {path: '/login', name: 'Login', component: LoginForm},
  {path: '/register', name: 'Register', component: RegisterForm},
  {
    path: '/layout',
    component: DefaultLayout,
    meta: { requiresAuth: true },
  },
  {
    path: '/books',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/books',
        name: 'BookList',
        component: BookList,
      },
      {
        path: '/books/create',
        name: 'BookCreate',
        component: BookCreate,
      },
      {
        path: '/books/:id/edit',
        name: 'BookEdit',
        component: BookEdit,
        props: true
      },
    ]
  },
  // {
  //   path: '/books',
  //   name: 'BookList',
  //   component: BookList,
  //   meta: {requiresAuth: true},
  // },
  // {
  //   path: '/books/create',
  //   name: 'BookCreate',
  //   component: BookCreate,
  //   meta: {requiresAuth: true},
  // },
  // {
  //   path: '/books/:id/edit',
  //   name: 'BookEdit',
  //   component: BookEdit,
  //   meta: {requiresAuth: true},
  //   props: true
  // },
  { path: '/:pathMatch(.*)*', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async(to, _, next) => {
  const auth = useAuthStore();
  await auth.fetchUser();
  if(['/login', '/register'].includes(to.path) && auth.user){
    next('/books');
  } else if (to.meta.requiresAuth && !auth.user) {
    next('/login');
  } else {
    next();
  }
});

export default router
