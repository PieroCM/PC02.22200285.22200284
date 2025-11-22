const routes = [
  {
    path: '/',
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

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
