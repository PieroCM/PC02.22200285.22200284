import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(function (/* { store, ssrContext } */) {
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

  // Guard de protección de rutas
  Router.beforeEach((to, from, next) => {
    const isLogged = localStorage.getItem('isLogged') === 'true'
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

    // Si está logueado y va al login, redirigir a digimons
    if (to.path === '/login' && isLogged) {
      next('/digimons')
    }
    // Si la ruta requiere autenticación y no está logueado, redirigir a login
    else if (requiresAuth && !isLogged) {
      next('/login')
    }
    // Permitir navegación
    else {
      next()
    }
  })

  return Router
})
