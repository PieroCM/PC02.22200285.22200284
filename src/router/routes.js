const routes = [
  {
    path: '/',
    redirect: '/login'
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // Página principal: DigimonPage
      { 
        path: '', 
        component: () => import('pages/DigimonPage/DigimonPage.vue') 
      },
      // Página de índice (opcional)
      { 
        path: 'index', 
        component: () => import('pages/IndexPage.vue') 
      }
    ],
  },
  {
    path: '/login',
    component: () => import('pages/login/LoginPage.vue')
  },
  {
    path: '/digimons',
    component: () => import('pages/DigimonListPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:catchAll(.*)*',
    redirect: '/login'
  }
]

export default routes
