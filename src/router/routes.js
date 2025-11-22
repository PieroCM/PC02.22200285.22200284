const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // Página inicial (IndexPage)
      { 
        path: '', 
        component: () => import('pages/IndexPage.vue') 
      },
      // Página de Digimons (tu parte)
      { 
        path: 'digimons', 
        component: () => import('pages/DigimonPage/DigimonPage.vue') 
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
