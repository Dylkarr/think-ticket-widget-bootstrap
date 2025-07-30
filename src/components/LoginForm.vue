<template>
  <b-card class="auth-card shadow-sm">
    <h4 class="auth-title text-center mb-4">Iniciar sesión</h4>

    <b-form @submit.prevent="handleSubmit">
      <!-- ──────── Correo ──────── -->
      <b-form-group label="Correo" label-for="email" class="mb-3">
        <b-form-input
          id="email"
          v-model="email"
          type="email"
          required
          :disabled="loading"
          autocomplete="username"
          class="auth-control"
        />
      </b-form-group>

      <!-- ───── Contraseña ───── -->
      <b-form-group label="Contraseña" label-for="password" class="mb-4">
        <b-form-input
          id="password"
          v-model="password"
          type="password"
          required
          :disabled="loading"
          autocomplete="current-password"
          class="auth-control"
        />
      </b-form-group>

      <!-- Botón principal -->
      <b-button type="submit" variant="primary" class="w-100 auth-btn btn btn-primary" :disabled="loading">
        {{ loading ? 'Ingresando…' : 'Entrar' }}
      </b-button>

      <!-- Mensaje de error -->
      <b-alert v-if="error" show variant="danger" class="mt-3 text-center small">
        {{ error }}
      </b-alert>
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
    const { data } = await authService.login(email.value, password.value)
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

<style scoped>

/* 1) Bootstrap 5 */
@import 'bootstrap/dist/css/bootstrap.min.css';

/* 2) Bootstrap‑Vue Next (opcional pero recomendado) */
@import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

/* 3) Bootstrap‑Icons si los usas */
@import 'bootstrap-icons/font/bootstrap-icons.css';
/* CARD ─────────────────────────────────── */
.auth-card {
  max-width: 420px;           /* ancho ideal para formularios cortos */
  margin: auto;               /* centra verticalmente dentro del contenedor padre */
  border: none;
  border-radius: 0.75rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, .05);
  padding: 2rem;              /* refuerza el espaciado interno */
}

/* TÍTULO ───────────────────────────────── */
.auth-title {
  font-weight: 600;
  letter-spacing: .2px;
}

/* INPUTS ───────────────────────────────── */
.auth-control {
  height: 44px;
  border-radius: .5rem;
  border: 1px solid #e0e3e7;
  background-color: #fff;
  font-size: .95rem;
  transition: border-color .2s ease, box-shadow .2s ease;
}
.auth-control:focus {
  border-color: var(--bs-primary);
  box-shadow: 0 0 0 .15rem rgba(var(--bs-primary-rgb), .25);
}

/* ETIQUETAS ────────────────────────────── */
:deep(.form-label) {
  font-weight: 500;
  margin-bottom: .35rem !important;
  color: #38424d;
}

/* BOTÓN ────────────────────────────────── */
.auth-btn {
  height: 44px;
  border-radius: .5rem;
  font-weight: 500;
}
</style>
