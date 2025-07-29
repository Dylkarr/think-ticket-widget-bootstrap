<template>
  <b-card class="shadow-sm" body-class="p-4" style="max-width:360px;">
    <h4 class="mb-3 text-center">Iniciar sesión</h4>

    <b-form @submit.prevent="handleSubmit" v-slot="{ validate }">
      <b-form-group label="Correo" label-for="email">
        <b-form-input id="email" v-model="email" type="email" required :disabled="loading"/>
      </b-form-group>

      <b-form-group label="Contraseña" label-for="password">
        <b-form-input id="password" v-model="password" type="password" required :disabled="loading"/>
      </b-form-group>

      <b-button type="submit" variant="primary" class="w-100" :disabled="loading">
        {{ loading ? 'Ingresando…' : 'Entrar' }}
      </b-button>

      <b-alert v-if="error" show variant="danger" class="mt-3">{{ error }}</b-alert>
    </b-form>
  </b-card>
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
