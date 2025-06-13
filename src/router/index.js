import { createRouter, createWebHistory } from 'vue-router';
import Main from '../components/Main.vue';

const routes = [
  { path: '/', component: Main },
  { path: '/posts', component: Main },
  // { path: '/videos', component: () => import('../views/Videos.vue') },
  // { path: '/about', component: () => import('../views/About.vue') },
  // { path: '/events', component: () => import('../views/Events.vue') },
  // { path: '/profile', component: () => import('../views/Profile.vue') },
  { path: '/login', component: () => import('../components/Login.vue') },
  { path: '/register', component: () => import('../components/Register.vue') }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
