import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import blink from '../components/blink.vue'
import saoma from '../components/saoma.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home/blink'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {path: 'blink', component: blink},
      {path: 'saoma', component: saoma}
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
