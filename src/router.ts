import Settings from "@/pages/Settings.vue"
import Employees from "@/pages/Employees.vue"
import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', component: Settings },
  { path: '/settings', component: Settings },
  { path: '/employees', component: Employees },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})