import { createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'
import Profile from './views/Profile.vue'
import Login from './views/Login.vue'
import JokleWithComments from './views/JokleWithComments.vue'
import TrendingTopics from './views/TrendingTopics.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'login', component: Login },
  { path: '/profile', name: 'profile', component: Profile },
  { path: '/posts/:id', name: 'JokleWithComments', component: JokleWithComments },
  { path: '/trending', name: 'TrendingTopics', component: TrendingTopics }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
