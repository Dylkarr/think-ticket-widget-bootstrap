<template>
  <div class="app-wrapper d-flex">
    <!-- ───────────── LOGIN ───────────── -->
    <div
      v-if="!authed"
      class="login-wrapper flex-grow-1 d-flex justify-content-center align-items-center"
    >
      <LoginForm @login-success="onLogin" />
    </div>

    <!-- ───────────── DASHBOARD ───────────── -->
    <b-sidebar v-else visible shadow backdrop class="sidebar-custom bg-dark text-white" style="width: 220px" no-header>

      <template #default>
        <ul class="nav flex-column">
          <li class="nav-item text-center">
            <h2>
              Postventa
            </h2>
          </li>
        <hr class="border-secondary my-4" />

          <li class="nav-item">
            <b-link
              class="nav-link"
              :class="{ active: view === 'tickets' }"
              @click="view = 'tickets'"
            >
              Mis Tickets
            </b-link>
          </li>
          <li class="nav-item">
            <b-link
              class="nav-link"
              :class="{ active: view === 'create' }"
              @click="view = 'create'"
            >
              Crear Ticket
            </b-link>
          </li>
          <li class="nav-item">
            <b-link
              class="nav-link"
              :class="{ active: view === 'agenda' }"
              @click="view = 'agenda'"
            >
              Mi Agenda
            </b-link>
          </li>
        </ul>

        <hr class="border-secondary my-4" />

        <b-button size="sm" variant="outline-light" class="w-100" @click="logout">
          Salir
        </b-button>
      </template>

    </b-sidebar>

    <main v-if="authed" class="content-area flex-grow-1">
      <TicketsPlaceholder v-if="view === 'tickets'" />
      <CreateTicketPlaceholder v-else-if="view === 'create'" />
      <AgendaPlaceholder v-else />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from './store'
import LoginForm from './components/LoginForm.vue'
import TicketsPlaceholder from './components/TicketsPlaceholder.vue'
import CreateTicketPlaceholder from './components/CreateTicketPlaceholder.vue'
import AgendaPlaceholder from './components/AgendaPlaceholder.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'bootstrap-icons/font/bootstrap-icons.css'


const store = useStore()
const authed = computed(() => !!store.user.value)
const view = ref<'tickets' | 'create' | 'agenda'>('tickets')

function onLogin() {
  view.value = 'tickets'
}
function logout() {
  store.logout()
  view.value = 'tickets'
}
</script>

<style scoped>
/* 1) Bootstrap 5 */
@import 'bootstrap/dist/css/bootstrap.min.css';

/* 2) Bootstrap‑Vue Next (opcional pero recomendado) */
@import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

/* 3) Bootstrap‑Icons */
@import 'bootstrap-icons/font/bootstrap-icons.css';

/* ─────────────────────────────────────────────── */
/* LAYOUT GENERAL */
.app-wrapper {
  height: 100vh;
}

/* ÁREA DE CONTENIDO */
.content-area {
  background: #f8f9fa;
  padding: 2rem;
  overflow-y: auto;
}

/* ─────────────────────────────────────────────── */
/* SIDEBAR */
.sidebar-custom {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
  padding: 1.5rem 1rem;
}

.sidebar-custom .nav-link {
  color: #adb5bd;
  padding: 0.65rem 0.75rem;
  border-left: 3px solid transparent;
  font-weight: 500;
  transition: color 0.15s ease, background 0.15s ease, border-color 0.15s ease;
}

.sidebar-custom .nav-link:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.05);
}

.sidebar-custom .nav-link.active {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
  border-left-color: var(--bs-primary);
}

/* ─────────────────────────────────────────────── */
/* LOGIN WRAPPER (opcional para fondo diferente) */
.login-wrapper {
  background: #f8f9fa;
}
</style>
