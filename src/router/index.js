import Vue from 'vue'
import VueRouter from 'vue-router'
import PLine1 from '../views/PLine1.vue'
import L1home from '../components/L1page1.vue'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

const routes = [
  {
    path: '/',
    redirect: '/pline1/page1'
  },
  {
    path: '/pline1',
    name: 'pline1',
    component: PLine1,
    children: [
      {path: 'page1', component: L1home, meta: {keepAlive: true}},
      {path: 'page2', component: () => import('../components/L1page2.vue'), meta: {keepAlive: true}},
      {path: 'page3', component: () => import('../components/L1page3.vue'), meta: {keepAlive: true}},
      {path: 'page4', component: () => import('../components/L1page4.vue'), meta: {keepAlive: true}},
    ],
    meta: {
      keepAlive: true
    }
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
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
