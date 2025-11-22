<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header / Barra superior -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="text-h5 text-weight-bold">
          Digimon API Frontend
        </q-toolbar-title>

        <!-- Botón de cerrar sesión (placeholder para tu compañera) -->
        <q-btn
          flat
          dense
          icon="logout"
          label="Cerrar sesión"
          class="q-ml-md"
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
export default {
  name: 'MainLayout',

  methods: {
    // Función placeholder para cerrar sesión
    // Tu compañera puede implementar la lógica aquí
    handleLogout() {
      console.log('Cerrar sesión - Implementar lógica aquí')
      // Ejemplo: this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
/* Estilos generales del layout */
.q-layout {
  background-color: #f5f5f5;
}
</style>
