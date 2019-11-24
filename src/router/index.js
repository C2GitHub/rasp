import Vue from 'vue'
import VueRouter from 'vue-router'
import PLine1 from '../views/PLine1.vue'
import L1home from '../components/L1home.vue'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

const routes = [
  {
    path: '/',
    redirect: '/pline1/home'
  },
  {
    path: '/pline1',
    name: 'pline1',
    component: PLine1,
    children: [
      {path: 'home', component: L1home, meta: {keepAlive: true}},
      {path: 'operate', component: () => import('../components/L1operate.vue'), meta: {keepAlive: true}},
      {path: 'current', component: () => import('../components/L1current.vue'), meta: {keepAlive: true}},
      {path: 'history', component: () => import('../components/L1history.vue'), meta: {keepAlive: true}},
    ],
    meta: {
      keepAlive: true
    }
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
  mode: 'hash',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

export default router
