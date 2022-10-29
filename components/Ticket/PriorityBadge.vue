<template>
  <button ref="priorityRef" :class="priority.style"
    class="inline-flex items-center rounded-full p-2 px-5 font-bold tracking-wide" @click="show">
    <p>
      {{ priority.name }}
    </p>
    <chevron-down-icon v-if="isEditable" class="w-5" />
  </button>
  <ul
    class="absolute z-10 bg-transparent dark:bg-transparent dark:text-gray-50 font-semibold rounded-md shadow-lg mt-2 translate-y-28 "
    v-show="isEditable && showPriorities">
    <template v-for="priority in PRIORITIES" :key="priority.name">
      <li class="px-4 py-2 cursor-pointer first:rounded-t-md last:rounded-b-md" :class="priority.style"
        @click="changePriority(priority.name)">
        {{ priority.name }}
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import { onClickOutside } from '@vueuse/core';
interface Props {
  priority: number
  isEditable?: boolean
}

const props = defineProps<Props>()

const PRIORITIES = {
  1: {
    name: 'Baja',
    color: 'green',
    style: 'bg-green-600 dark:bg-green-300 text-green-50 dark:text-green-800 hover:bg-green-700 dark:hover:bg-green-400'
  },
  2: {
    name: 'Media',
    color: 'blue',
    style: 'bg-blue-600 dark:bg-blue-300 text-blue-50 dark:text-blue-800 hover:bg-blue-700 dark:hover:bg-blue-400'
  },
  3: {
    name: 'Alta',
    color: 'yellow',
    style: 'bg-yellow-600 dark:bg-yellow-300 text-yellow-50 dark:text-yellow-800 hover:bg-yellow-700 dark:hover:bg-yellow-400'
  },
  4: {
    name: 'Urgente',
    color: 'red',
    style: 'bg-red-600 dark:bg-red-300 text-red-50 dark:text-red-800 hover:bg-red-700 dark:hover:bg-red-400'
  }
}

const priority = ref(PRIORITIES[props.priority])
const priorityRef = ref(null)
const showPriorities = ref<boolean>(false)

onClickOutside(priorityRef, () => {
  showPriorities.value = false
})

const changePriority = (newPriority: string) => {
  if (newPriority === priority.value.name) return
  if (confirm(`¿Estás seguro de cambiar la prioridad a ${newPriority}?`)) {
    priority.value = Object.values(PRIORITIES).find((p: any) => p.name === newPriority)
  }
}

const show = () => {
  if (!props.isEditable) return
  showPriorities.value = !showPriorities.value
}

</script>

<style scoped>

</style>