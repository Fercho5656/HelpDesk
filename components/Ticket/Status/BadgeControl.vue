<template>
  <ticket-status-button @click="openTicket" :class="actualStatus.style" v-if="actualStatus.id === 1" @mouseover="hover = true"
    @mouseleave="hover = false">
    <p>{{ hover ? 'Tomar Ticket' : 'Abierto' }}</p>
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
    style: 'bg-yellow-600 dark:bg-yellow-300 text-yellow-50 dark:text-yellow-800 hover:bg-yellow-700 dark:hover:bg-yellow-400'
  },
  {
    id: 5,
    name: 'Cerrado',
    color: 'red',
    style: 'bg-red-600 dark:bg-red-300 text-red-50 dark:text-red-800 hover:bg-red-700 dark:hover:bg-red-400'
  }
]

const props = defineProps<Status>()
const emits = defineEmits(['update:status'])
const hover = ref(false)
const actualStatus = ref(STATUS.find((s: any) => s.id === props.status))

const openTicket = () => {
  if (confirm('¿Estás seguro de tomar este ticket?')) {
    actualStatus.value = STATUS.find((s: any) => s.id === 2)
    emits('update:status', 2)
  }
}

const deliverTicket = () => {

}
</script>

<style scoped>

</style>