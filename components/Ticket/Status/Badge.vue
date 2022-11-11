<template>
  <span v-if="status.id === 4"
    class="inline-flex items-center rounded-full p-2 px-5 font-bold tracking-wide cursor-pointer" :class="status.style"
    @click="closeOrReturnTicket">
    <p>Cerrar o Regresar Ticket</p>
  </span>
  <span v-else class="inline-flex items-center rounded-full p-2 px-5 font-bold tracking-wide" :class="status.style">
    <p>{{ status.name }}</p>
  </span>

</template>

<script setup lang="ts">
interface Props {
  status: number
}

const props = defineProps<Props>()
const emits = defineEmits(['update:status'])

const STATUS = [
  {
    id: 1,
    name: 'Abierto',
    color: 'green',
    style: 'bg-green-600 dark:bg-green-300 text-green-50 dark:text-green-800'
  },
  {
    id: 2,
    name: 'En Progreso',
    color: 'blue',
    style: 'bg-blue-600 dark:bg-blue-300 text-blue-50 dark:text-blue-800'
  },
  {
    id: 3,
    name: 'Regresado',
    color: 'gray',
    style: 'bg-gray-600 dark:bg-gray-300 text-gray-50 dark:text-gray-800'
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
const status = ref(STATUS.find((s: any) => s.id === props.status))

const closeOrReturnTicket = () => {
  const close = confirm('¿Desea cerrar el ticket?')
  if (close) {
    emits('update:status', 5)
  } else {
    emits('update:status', 3)
  }
}

watch(() => props.status, (newStatus) => {
  status.value = STATUS.find((s: any) => s.id === newStatus)
})
</script>

<style scoped>

</style>