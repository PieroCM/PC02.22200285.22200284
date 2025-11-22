<template>
  <q-page class="digimon-page">
    <div class="page-container">
      <!-- Título y descripción -->
      <div class="header-section">
        <h1 class="page-title">Listado de Digimons</h1>
        <p class="page-subtitle">
          Explora la base de datos completa de Digimons. Puedes filtrar por nombre y nivel.
        </p>
      </div>

      <!-- Zona de filtros -->
      <div class="filters-section">
        <div class="row q-col-gutter-md">
          <!-- Filtro por nombre -->
          <div class="col-12 col-md-6">
            <q-input
              v-model="filterName"
              outlined
              label="Buscar por nombre"
              placeholder="Ej: Agumon, Gabumon..."
              clearable
              dense
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>

          <!-- Filtro por nivel -->
          <div class="col-12 col-md-6">
            <q-select
              v-model="filterLevel"
              outlined
              label="Filtrar por nivel"
              :options="levelOptions"
              clearable
              dense
              emit-value
              map-options
            >
              <template v-slot:prepend>
                <q-icon name="filter_list" />
              </template>
            </q-select>
          </div>
        </div>
      </div>

      <!-- Estado de carga -->
      <div v-if="loading" class="loading-section">
        <q-spinner color="primary" size="50px" />
        <p class="text-grey-7 q-mt-md">Cargando Digimons...</p>
      </div>

      <!-- Estado de error -->
      <div v-else-if="error" class="error-section">
        <q-icon name="error_outline" size="50px" color="negative" />
        <p class="text-negative q-mt-md">{{ error }}</p>
        <q-btn
          color="primary"
          label="Reintentar"
          @click="fetchDigimons"
          class="q-mt-md"
        />
      </div>

      <!-- Estado sin resultados -->
      <div v-else-if="filteredDigimons.length === 0" class="no-results-section">
        <q-icon name="search_off" size="50px" color="grey-6" />
        <p class="text-grey-7 q-mt-md">
          No se encontraron Digimons con los filtros aplicados.
        </p>
      </div>

      <!-- Listado de Digimons en cards -->
      <div v-else class="digimons-grid">
        <div class="row q-col-gutter-md">
          <div
            v-for="digimon in filteredDigimons"
            :key="digimon.name"
            class="col-12 col-sm-6 col-md-4 col-lg-3"
          >
            <q-card class="digimon-card">
              <!-- Imagen del Digimon -->
              <q-img
                :src="digimon.img"
                :alt="digimon.name"
                ratio="1"
                class="digimon-image"
              >
                <template v-slot:error>
                  <div class="absolute-full flex flex-center bg-grey-3">
                    <q-icon name="broken_image" size="50px" color="grey-6" />
                  </div>
                </template>
              </q-img>

              <!-- Contenido de la card -->
              <q-card-section>
                <div class="digimon-name">{{ digimon.name }}</div>
                <div class="digimon-level">
                  <q-chip
                    :color="getLevelColor(digimon.level)"
                    text-color="white"
                    size="sm"
                    dense
                  >
                    {{ digimon.level }}
                  </q-chip>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'DigimonPage',

  setup() {
    // ===== ESTADO DE LA PÁGINA =====
    const digimons = ref([]) // Array base con todos los Digimons
    const loading = ref(false) // Estado de carga
    const error = ref(null) // Estado de error

    // ===== FILTROS =====
    const filterName = ref('') // Filtro por nombre
    const filterLevel = ref(null) // Filtro por nivel

    // ===== LLAMADA A LA API =====
    const fetchDigimons = async () => {
      loading.value = true
      error.value = null

      try {
        const response = await axios.get('https://digimon-api.vercel.app/api/digimon')
        digimons.value = response.data
      } catch (err) {
        console.error('Error al cargar Digimons:', err)
        error.value = 'No se pudo cargar la lista de Digimons. Por favor, intenta de nuevo.'
      } finally {
        loading.value = false
      }
    }

    // ===== OPCIONES DE NIVEL (dinámicas) =====
    const levelOptions = computed(() => {
      // Extraer niveles únicos de todos los Digimons
      const uniqueLevels = [...new Set(digimons.value.map(d => d.level))]
      // Ordenar alfabéticamente
      uniqueLevels.sort()
      // Convertir a formato para q-select
      return [
        { label: 'Todos los niveles', value: null },
        ...uniqueLevels.map(level => ({ label: level, value: level }))
      ]
    })

    // ===== DIGIMONS FILTRADOS =====
    const filteredDigimons = computed(() => {
      let result = digimons.value

      // Filtrar por nombre (búsqueda parcial e insensible a mayúsculas)
      if (filterName.value) {
        const searchTerm = filterName.value.toLowerCase().trim()
        result = result.filter(digimon =>
          digimon.name.toLowerCase().includes(searchTerm)
        )
      }

      // Filtrar por nivel
      if (filterLevel.value) {
        result = result.filter(digimon => digimon.level === filterLevel.value)
      }

      return result
    })

    // ===== FUNCIÓN PARA COLORES DE CHIPS =====
    const getLevelColor = (level) => {
      const colors = {
        'Fresh': 'green-4',
        'In Training': 'light-blue-4',
        'Rookie': 'blue-6',
        'Champion': 'purple-6',
        'Ultimate': 'deep-orange-6',
        'Mega': 'red-8',
        'Armor': 'amber-8'
      }
      return colors[level] || 'grey-6'
    }

    // ===== CARGAR DATOS AL MONTAR EL COMPONENTE =====
    onMounted(() => {
      fetchDigimons()
    })

    return {
      digimons,
      loading,
      error,
      filterName,
      filterLevel,
      levelOptions,
      filteredDigimons,
      fetchDigimons,
      getLevelColor
    }
  }
}
</script>

<style scoped>
/* ===== CONTENEDOR PRINCIPAL ===== */
.digimon-page {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 20px;
}

.page-container {
  max-width: 1400px;
  margin: 0 auto;
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* ===== HEADER ===== */
.header-section {
  text-align: center;
  margin-bottom: 30px;
}

.page-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #1976d2;
  margin: 0 0 10px 0;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #666;
  margin: 0;
}

/* ===== FILTROS ===== */
.filters-section {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

/* ===== ESTADOS (CARGA, ERROR, SIN RESULTADOS) ===== */
.loading-section,
.error-section,
.no-results-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

/* ===== GRILLA DE DIGIMONS ===== */
.digimons-grid {
  margin-top: 20px;
}

.digimon-card {
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.digimon-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.digimon-image {
  background-color: #f5f5f5;
}

.digimon-name {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
  text-align: center;
}

.digimon-level {
  display: flex;
  justify-content: center;
}

/* ===== RESPONSIVIDAD ===== */
@media (max-width: 599px) {
  .page-container {
    padding: 20px 15px;
  }

  .page-title {
    font-size: 1.8rem;
  }

  .page-subtitle {
    font-size: 1rem;
  }
}
</style>
