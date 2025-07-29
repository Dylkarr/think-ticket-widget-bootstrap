<template>
  <div class="d-flex h-100">
    <!-- Login -->
    <div v-if="!authed" class="w-100 d-flex justify-content-center align-items-center">
      <LoginForm @login-success="onLogin"/>
    </div>

    <!-- Dashboard -->
    <b-sidebar v-else visible shadow backdrop class="bg-dark text-white"
               style="width:220px" no-header>
      <template #default>
        <ul class="nav flex-column">
          <li class="nav-item">
            <b-link class="nav-link" :class="{active:view==='tickets'}"
                    @click="view='tickets'">
              <i class="bi bi-ticket-perforated me-1"></i>Mis Tickets
            </b-link>
          </li>
          <li class="nav-item">
            <b-link class="nav-link" :class="{active:view==='create'}"
                    @click="view='create'">
              <i class="bi bi-plus-circle me-1"></i>Crear Ticket
            </b-link>
          </li>
          <li class="nav-item">
            <b-link class="nav-link" :class="{active:view==='agenda'}"
                    @click="view='agenda'">
              <i class="bi bi-calendar-event me-1"></i>Mi Agenda
            </b-link>
          </li>
        </ul>

        <hr class="border-secondary my-3">

        <b-button size="sm" variant="outline-light" @click="logout">
          <i class="bi bi-box-arrow-right me-1"></i>Salir
        </b-button>
      </template>
    </b-sidebar>

    <main v-if="authed" class="flex-grow-1 p-4 bg-light overflow-auto">
      <TicketsPlaceholder v-if="view==='tickets'"/>
      <CreateTicketPlaceholder v-else-if="view==='create'"/>
      <AgendaPlaceholder v-else/>
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
