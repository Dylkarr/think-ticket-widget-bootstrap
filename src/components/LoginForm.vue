<template>
  <div class="card shadow-sm" style="max-width: 360px; width:100%;">
    <div class="card-body">
      <h4 class="card-title mb-3 text-center">Iniciar sesión</h4>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label class="form-label">Correo</label>
          <input v-model="email" type="email" class="form-control" placeholder="correo@example.com" :disabled="loading" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Contraseña</label>
          <input v-model="password" type="password" class="form-control" placeholder="••••••" :disabled="loading" required />
        </div>
        <button class="btn btn-primary w-100" :disabled="loading">
          {{ loading ? 'Ingresando…' : 'Entrar' }}
        </button>
        <div v-if="error" class="alert alert-danger py-2 mt-3">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { authService } from '../services/authService'
import { useStore } from '../store'
const emit = defineEmits(['login-success'])

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const store = useStore()

async function handleSubmit() {
  loading.value = true
  error.value = ''
  try {
    const response = await authService.login(email.value, password.value)
    const data = response.data
    const user = data.user ?? data.data?.user
    if (!user) throw new Error('Respuesta inesperada')
    store.setUser(user)
    window.dispatchEvent(new CustomEvent('think:login:success', { detail: { user } }))
    emit('login-success')
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Credenciales incorrectas'
  } finally {
    loading.value = false
  }
}
</script>
