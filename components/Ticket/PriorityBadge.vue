<template>
  <div class="relative">
    <button ref="priorityRef" :class="`${actualPriority.style} ${isEditable ? '' : 'pointer-events-none'} `"
      class="inline-flex items-center rounded-full p-2 px-5 font-bold tracking-wide" @click="showList">
      <p>
        {{ actualPriority.name }}
      </p>
      <chevron-down-icon v-if="isEditable" class="w-5" />
    </button>
    <ul class="absolute z-10 bg-transparent dark:bg-transparent dark:text-gray-50 font-semibold rounded-md shadow-lg"
      v-show="isEditable && showPriorities">
      <template v-for="priority in PRIORITIES" :key="priority.name">
        <li class="px-4 py-2 cursor-pointer first:rounded-t-md last:rounded-b-md" :class="priority.style"
          @click="changePriority(priority.name)">
          {{ priority.name }}
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import { onClickOutside } from '@vueuse/core';
interface Props {
  priority: number
  isEditable?: boolean
}

const props = defineProps<Props>()
const emits = defineEmits(['update:priority'])

const PRIORITIES = [
  {
    id: 1,
    name: 'Baja',
    color: 'green',
    style: 'bg-green-600 dark:bg-green-300 text-green-50 dark:text-green-800 hover:bg-green-700 dark:hover:bg-green-400'
  },
  {
    id: 2,
    name: 'Media',
    color: 'blue',
    style: 'bg-blue-600 dark:bg-blue-300 text-blue-50 dark:text-blue-800 hover:bg-blue-700 dark:hover:bg-blue-400'
  },
  {
    id: 3,
    name: 'Alta',
    color: 'yellow',
    style: 'bg-yellow-600 dark:bg-yellow-300 text-yellow-50 dark:text-yellow-800 hover:bg-yellow-700 dark:hover:bg-yellow-400'
  },
  {
    id: 4,
    name: 'Urgente',
    color: 'red',
    style: 'bg-red-600 dark:bg-red-300 text-red-50 dark:text-red-800 hover:bg-red-700 dark:hover:bg-red-400'
  }
]

const actualPriority = ref(PRIORITIES.find((priority) => priority.id === props.priority))
const priorityRef = ref(null)
const showPriorities = ref<boolean>(false)

watch(() => props.priority, (newPriority) => {
  actualPriority.value = PRIORITIES.find((priority) => priority.id === newPriority)
})

onClickOutside(priorityRef, () => {
  showPriorities.value = false
})

const changePriority = (newPriority: string) => {
  if (newPriority === actualPriority.value.name) return
  if (confirm(`¿Estás seguro de cambiar la prioridad a ${newPriority.toLocaleLowerCase()}?`)) {
    // actualPriority.value = Object.values(PRIORITIES).find((p: any) => p.name === newPriority)
    emits('update:priority', Object.values(PRIORITIES).find((p: any) => p.name === newPriority).id)
  }
}

const showList = () => {
  if (!props.isEditable) return
  showPriorities.value = !showPriorities.value
}

</script>

<style scoped>

</style>