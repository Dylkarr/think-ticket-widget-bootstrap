<template>
  <div class="d-flex w-100 h-100" style="min-height: 400px;">
    <div v-if="!authed" class="w-100 d-flex justify-content-center align-items-center">
      <LoginForm @login-success="onLogin" />
    </div>

    <template v-else>
      <nav class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style="width: 220px;">
        <h4 class="text-white text-center mb-4">Mi Panel</h4>
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item">
            <a class="nav-link text-white" :class="{active:view==='tickets'}" @click="view='tickets'">Mis Tickets</a>
          </li>
          <li>
            <a class="nav-link text-white" :class="{active:view==='create'}" @click="view='create'">Crear Ticket</a>
          </li>
          <li>
            <a class="nav-link text-white" :class="{active:view==='agenda'}" @click="view='agenda'">Mi Agenda</a>
          </li>
        </ul>
        <hr>
        <button class="btn btn-sm btn-outline-light mt-auto" @click="logout">Salir</button>
      </nav>

      <main class="flex-grow-1 p-4 bg-light">
        <TicketsPlaceholder v-if="view==='tickets'" />
        <CreateTicketPlaceholder v-else-if="view==='create'" />
        <AgendaPlaceholder v-else />
      </main>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from './store'
import LoginForm from './components/LoginForm.vue'
import TicketsPlaceholder from './components/TicketsPlaceholder.vue'
import CreateTicketPlaceholder from './components/CreateTicketPlaceholder.vue'
import AgendaPlaceholder from './components/AgendaPlaceholder.vue'

const store = useStore()
const authed = computed(() => !!store.user.value)
const view = ref<'tickets' | 'create' | 'agenda'>('tickets')

function onLogin() { view.value = 'tickets' }
function logout() { store.logout(); view.value = 'tickets' }
</script>

<style scoped>
@import 'bootstrap/dist/css/bootstrap.min.css';
html,body { height: 100%; }
</style>
