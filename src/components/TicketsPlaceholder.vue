<!-- TicketsTable.vue -->
<template>
  <b-row class="justify-content-center">
    <b-col cols="12">
      <b-card no-body class="shadow-sm border-0">
        <!-- ───── Encabezado ───── -->
        <b-card-header class="bg-white border-bottom-0 p-3">
          <h4 class="mb-0">Mis Tickets</h4>
        </b-card-header>

        <!-- ───── Tabla manual ───── -->
        <b-card-body class="p-0">
          <div class="table-responsive mx-4">
            <table class="table table-bordered table-hover align-middle mb-0">
              <thead class="table-dark text-center small text-uppercase">
                <tr>
                  <th>IdTicket</th>
                  <th>Cliente</th>
                  <th>Inmueble</th>
                  <th>Fecha Creación</th>
                  <th>Estado</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="ticket in mappedTickets"
                  :key="ticket.id"
                  style="cursor:pointer;"
                  @click="openModal(ticket)"
                >
                  <td class="text-center">{{ ticket.id }}</td>
                  <td class="text-center fw-semibold">{{ ticket.cliente.nombre }}</td>
                  <td class="text-center text-muted">N° {{ ticket.inmueble.id }}</td>
                  <td class="text-center">{{ formatDate(ticket.fecha_creacion) }}</td>
                  <td class="text-center">
                    <span :class="['badge rounded-pill', getBadgeClass(ticket.estado)]">
                      {{ ticket.estado }}
                    </span>
                  </td>
                </tr>

                <!-- Si no hay datos -->
                <tr v-if="!mappedTickets.length">
                  <td class="text-center" colspan="5">
                    <em>No hay registros</em>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script setup lang="ts">
import { computed } from 'vue';

/* ===== Tipos y mock ===== */
interface Ticket {
  id: number;
  cliente: { nombre: string };
  inmueble: { id: number | string };
  fecha_creacion: Date | string;
  estado: string;
  canal_ingreso: string;
}

const tickets: Ticket[] = [
  {
    id: 1,
    cliente: { nombre: 'Juan Pérez' },
    inmueble: { id: 101 },
    fecha_creacion: '2025-05-01',
    estado: 'Pendiente',
    canal_ingreso: 'Web',
  },
];

/* ===== Campos calculados ===== */
const mappedTickets = computed(() =>
  tickets.map(t => ({
    ...t,
    cliente: t.cliente || { nombre: 'Desconocido' },
    inmueble: t.inmueble || { id: 'Desconocido' },
  })),
);

/* ===== Helpers ===== */
const formatDate = (d: Date | string) => {
  const date = d instanceof Date ? d : new Date(d);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const getBadgeClass = (estado: string) =>
  ({
    Pendiente: 'bg-secondary-subtle text-secondary',
    'Inspección Programada': 'bg-warning-subtle text-warning',
    'Reparación en Proceso': 'bg-info-subtle text-info',
    Resuelto: 'bg-success-subtle text-success',
    Rechazado: 'bg-danger-subtle text-danger',
  }[estado] || 'bg-dark-subtle text-dark');

/* ===== Acción al hacer clic en la fila ===== */
const openModal = (t: Ticket) => {
  // tu lógica para abrir modal
  console.log('Abrir modal para ticket', t.id);
};
</script>

<style scoped>
@import 'bootstrap/dist/css/bootstrap.min.css';
@import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

.table-responsive{
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

/* Refuerza el grosor del borde para que sea más visible */
table.table-bordered > :deep(thead th),
table.table-bordered > :deep(tbody td) {
  border: 1px solid var(--bs-gray-400) !important;
  /* border-top-left-radius: 20px; */
}

/* Hover con sutil sombra interior */
table.table-hover tbody tr:hover td {
  background-color: var(--bs-primary-bg-subtle);
}

/* Badges sutiles ya definidos arriba (reutilizamos) */
.bg-secondary-subtle { background:#e2e3e5!important;color:#41464b!important; }
.bg-warning-subtle   { background:#fff3cd!important;color:#856404!important; }
.bg-info-subtle      { background:#d1ecf1!important;color:#0c5460!important; }
.bg-success-subtle   { background:#d4edda!important;color:#155724!important; }
.bg-danger-subtle    { background:#f8d7da!important;color:#721c24!important; }
.bg-primary-subtle   { background:#cfe2ff!important;color:#084298!important; }
.bg-dark-subtle      { background:#dee2e6!important;color:#343a40!important; }
</style>
