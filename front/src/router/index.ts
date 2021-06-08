import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Roadmap from '@/views/Roadmap.vue'
import Progress from '@/views/Progress.vue'
import SignUp from "@/views/SignUp.vue";
import Login from "@/views/Login.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/roadmap/:id',
    name: 'roadmap',
    component: Roadmap,
  },
  {
    path: '/progress',
    name: 'progress',
    component: Progress
  },
  {
    path: "/registration",
    name: "registration",
    component: SignUp
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
