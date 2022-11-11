<template>
  <ticket-status-button @click="openTicket" :class="actualStatus.style" v-if="actualStatus.id === 1"
    @mouseover="hover = true" @mouseleave="hover = false">
    <p>{{ hover ? 'Tomar Ticket' : 'Abierto' }}</p>
  </ticket-status-button>
  <ticket-status-button @click="deliverTicket" :class="actualStatus.style" v-if="actualStatus.id === 2"
    @mouseover="hover = true" @mouseleave="hover = false">
    <p>{{ hover ? 'Entregar Ticket' : 'En Proceso' }}</p>
  </ticket-status-button>
  <ticket-status-button @click="deliverTicket" :class="actualStatus.style" v-if="actualStatus.id === 3"
    @mouseover="hover = true" @mouseleave="hover = false">
    <p>{{ hover ? 'Entregar Ticket' : 'Regresado' }}</p>
  </ticket-status-button>
  <ticket-status-button class="pointer-events-none" :class="actualStatus.style"
    v-if="actualStatus.id === 4 || actualStatus.id === 5">
    <p>{{ actualStatus.name }}</p>
  </ticket-status-button>
</template>

<script setup lang="ts">
interface Status {
  status: number
}

const STATUS = [
  {
    id: 1,
    name: 'Abierto',
    color: 'green',
    style: 'bg-green-600 dark:bg-green-300 text-green-50 dark:text-green-800 hover:bg-green-700 dark:hover:bg-green-400'
  },
  {
    id: 2,
    name: 'En Progreso',
    color: 'blue',
    style: 'bg-blue-600 dark:bg-blue-300 text-blue-50 dark:text-blue-800 hover:bg-blue-700 dark:hover:bg-blue-400'
  },
  {
    id: 3,
    name: 'Regresado',
    color: 'gray',
    style: 'bg-gray-600 dark:bg-gray-300 text-gray-50 dark:text-gray-800 hover:bg-gray-700 dark:hover:bg-gray-400'
  },
  {
    id: 4,
    name: 'Entregado',
    color: 'yellow',
    style: 'bg-yellow-600 dark:bg-yellow-300 text-yellow-50 dark:text-yellow-800'
  },
  {
    id: 5,
    name: 'Cerrado',
    color: 'red',
    style: 'bg-red-600 dark:bg-red-300 text-red-50 dark:text-red-800'
  }
]

const props = defineProps<Status>()
const emits = defineEmits(['update:status', 'take-ticket'])
const hover = ref(false)
const actualStatus = ref(STATUS.find((s: any) => s.id === props.status))

watch(() => props.status, (newStatus) => {
  actualStatus.value = STATUS.find((s: any) => s.id === newStatus)
})

const openTicket = () => {
  if (confirm('¿Estás seguro de tomar este ticket?')) {
    hover.value = false
    // actualStatus.value = STATUS.find((s: any) => s.id === 2)
    emits('take-ticket')
    emits('update:status', 2)
  }
}

const deliverTicket = () => {
  if (confirm('¿Estás seguro de entregar este ticket al usuario?')) {
    hover.value = false
    // actualStatus.value = STATUS.find((s: any) => s.id === 4)
    emits('update:status', 4)
  }
}
</script>

<style scoped>

</style>