import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: () => import('../components/Main.vue') },
  { path: '/main', component: () => import('../components/Main.vue') },
  { path: '/posts', component: () => import('../components/ListPost.vue') },
  { path: '/posts/:id', component: () => import('../components/PostDetails.vue') },
  { path: '/videos', component: () => import('../components/Video.vue') },
  { path: '/about', component: () => import('../components/GioiThieu.vue') },
  { path: '/events', component: () => import('../components/SuKien.vue') },
  { path: '/profile', component: () => import('../components/Profile.vue') },
  { path: '/create-post', component: () => import('../components/UpPost.vue') },
  { path: '/login', component: () => import('../components/Login.vue') },
  { path: '/register', component: () => import('../components/Register.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;