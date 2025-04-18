import { route } from 'quasar/wrappers'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'

import routes from './routes'
import { useAuthStore } from 'stores/auth-store'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
const createHistory = process.env.SERVER
  ? createMemoryHistory
  : process.env.VUE_ROUTER_MODE === 'history'
  ? createWebHistory
  : createWebHashHistory

const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,

  // Leave this as is and make changes in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  history: createHistory(process.env.VUE_ROUTER_BASE),
})

export default route(function (/* { store, ssrContext } */) {
  const auth = useAuthStore()

  Router.beforeEach((to) => {
    if (to.name === 'login' && auth.isLoggedIn) {
      return {
        name: 'home',
      }
    }

    if (to.meta.requiresAuth && !auth.isLoggedIn) {
      return {
        path: '/login',
        query: { redirect: to.fullPath },
      }
    }

    const allowedRoles = to.meta?.allowedRoles as string[]
    if (allowedRoles && !auth.hasRoles(allowedRoles)) {
      return { name: 'home' }
    }
  })
  return Router
})

export { Router }
