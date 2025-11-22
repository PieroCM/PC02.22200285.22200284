<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header / Barra superior -->
    <q-header elevated class="header-gradient">
      <q-toolbar class="q-px-lg">
        <q-icon name="pets" size="md" class="q-mr-sm" />
        <q-toolbar-title class="text-h5 text-weight-bold">
          Digimon API Frontend
        </q-toolbar-title>

        <!-- Botón de cerrar sesión mejorado -->
        <q-btn
          flat
          rounded
          icon="logout"
          label="Cerrar sesión"
          class="logout-btn"
          @click="handleLogout"
        />
      </q-toolbar>
    </q-header>

    <!-- Contenedor principal de las páginas -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default {
  name: 'MainLayout',

  setup() {
    const router = useRouter()
    const $q = useQuasar()

    const handleLogout = () => {
      // Limpiar datos de sesión
      localStorage.removeItem('token')
      localStorage.removeItem('isLogged')

      // Notificación de cierre de sesión
      $q.notify({
        type: 'info',
        message: 'Sesión cerrada correctamente',
        position: 'top',
        timeout: 1500,
      })

      // Redirigir al login
      router.push('/login')
    }

    return {
      handleLogout
    }
  }
}
</script>

<style scoped>
/* Estilos generales del layout */
.q-layout {
  background-color: #f5f5f5;
}

/* Header con degradado moderno */
.header-gradient {
  background: linear-gradient(135deg, #1565c0 0%, #1976d2 50%, #1e88e5 100%);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
}

/* Botón de cerrar sesión mejorado */
.logout-btn {
  padding: 8px 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background-color: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.5);
}
</style>
