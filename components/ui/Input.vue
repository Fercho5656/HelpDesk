<template>
  <label class="relative block text-sm font-medium text-gray-900 dark:text-gray-300">
    <p class="absolute top-0 -translate-y-full text-md">{{label}}</p>
    <span class="absolute pointer-events-none top-1/2 w-7 h-7 -translate-y-1/2 left-3">
      <envelope-icon v-if="type === 'email'" />
      <user-icon v-if="type === 'text'" />
      <calendar-days-icon v-if="type === 'date'" />
    </span>
    <input
      class="appearance-none block w-full py-3 px-4 pl-14 text-md rounded-md bg-gray-200 dark:bg-gray-500 dark:placeholder-gray-300 focus:outline-none"
      :type="type" :placeholder="placeholder" :value="modelValue"
      @input="onInput">
  </label>
</template>

<script setup lang="ts">

import { EnvelopeIcon, UserIcon, CalendarDaysIcon } from '@heroicons/vue/24/solid/'

interface Props {
  label: string
  type: InputTypes
  placeholder?: string
  modelValue: string | number
}

defineProps<Props>()
const emits = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const onInput = (e: Event): Event => {
  emits('update:modelValue', (e.target as HTMLInputElement).value)
  return e
}
</script>

<style scoped>

</style>