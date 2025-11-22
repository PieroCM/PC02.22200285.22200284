const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: () => import('pages/login/LoginPage.vue'),
  },
  {
    path: '/digimons',
    component: () => import('pages/DigimonListPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/:catchAll(.*)*',
    redirect: '/login',
  },
]

export default routes
