<template>
  <div class="login-page">
    <!-- Fondo con overlay -->
    <div class="background-overlay"></div>

    <!-- Card glassmorphism -->
    <div class="login-container">
      <q-card class="glass-card">
        <q-card-section>
          <div class="text-h4 text-center text-white q-mb-lg">Iniciar Sesión</div>

          <!-- INPUT DE EMAIL -->
          <q-input
            filled
            v-model="email"
            label="Correo electrónico"
            type="email"
            class="q-mb-md glass-input"
            dark
            color="white"
            label-color="white"
          >
            <template v-slot:prepend>
              <q-icon name="email" color="white" />
            </template>
          </q-input>

          <!-- INPUT DE PASSWORD -->
          <q-input
            filled
            v-model="password"
            label="Contraseña"
            :type="isPwd ? 'password' : 'text'"
            class="q-mb-lg glass-input"
            dark
            color="white"
            label-color="white"
          >
            <template v-slot:prepend>
              <q-icon name="lock" color="white" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                color="white"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <!-- BOTÓN LOGIN -->
          <q-btn
            unelevated
            color="primary"
            label="Ingresar"
            class="full-width q-py-md text-weight-bold"
            @click="login"
            :loading="loading"
            size="lg"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

const router = useRouter()
const $q = useQuasar()

const email = ref('')
const password = ref('')
const loading = ref(false)
const isPwd = ref(true)

const login = async () => {
  // Validación de campos vacíos
  if (!email.value || !password.value) {
    $q.notify({
      type: 'negative',
      message: 'Por favor completa todos los campos',
      position: 'top',
      timeout: 2000,
    })
    return
  }

  loading.value = true

  try {
    const response = await api.post('/users/signin', {
      email: email.value,
      password: password.value,
    })

    // GUARDAR TOKEN Y ESTADO DE LOGIN
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('isLogged', 'true')

    // NOTIFICACIÓN DE ÉXITO
    $q.notify({
      type: 'positive',
      message: 'Inicio de sesión exitoso',
      position: 'top',
      timeout: 1500,
    })

    // REDIRECCIONAR A DIGIMONS
    router.push('/digimons')
  } catch {
    // NOTIFICACIÓN DE ERROR
    $q.notify({
      type: 'negative',
      message: 'Error: credenciales incorrectas',
      position: 'top',
      timeout: 2500,
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.login-page {
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url('@/assets/digimon-background-ifqffin4g94gi7d2.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.35);
  z-index: 0;
}

.login-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 420px;
  padding: 20px;
}

.glass-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  padding: 40px 30px;
}

.glass-input {
  :deep(.q-field__control) {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;

    &:before {
      border: none;
    }
  }

  :deep(.q-field__label) {
    color: rgba(255, 255, 255, 0.8);
  }

  :deep(input) {
    color: white;
  }
}

@media (max-width: 600px) {
  .login-container {
    max-width: 90%;
  }

  .glass-card {
    padding: 30px 20px;
  }
}
</style>
