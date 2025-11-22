import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Crear instancia de axios
const api = axios.create({
  baseURL: 'https://storedb-api.onrender.com/node-api',
  headers: {
    'accept': '*/*',
    'Content-Type': 'application/json'
  }
})

// Interceptor de request para agregar token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor de response para manejo de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('isLogged')
      window.location.href = '/#/login'
    }
    return Promise.reject(error)
  }
)

export default boot(({ app }) => {
  // Hacer axios disponible globalmente
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api, axios }
