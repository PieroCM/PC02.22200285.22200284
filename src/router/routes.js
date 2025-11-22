const routes = [
  // Ruta de login (sin layout)
  {
    path: '/login',
    component: () => import('pages/login/LoginPage.vue')
  },
  // Rutas principales con MainLayout
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // Página de Digimons (requiere autenticación)
      { 
        path: '', 
        redirect: '/digimons'
      },
      { 
        path: 'digimons', 
        component: () => import('pages/DigimonPage/DigimonPage.vue'),
        meta: { requiresAuth: true }
      }
    ],
  },
  // Ruta catch-all: redirige al login
  {
    path: '/:catchAll(.*)*',
    redirect: '/login'
  }
]

export default routes
