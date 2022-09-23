<template>
  <label class="relative block text-sm font-medium text-gray-900 dark:text-gray-300">
    <p class="absolute top-0 -translate-y-full">{{label}}</p>
    <span class="absolute pointer-events-none top-1/2 w-7 h-7 -translate-y-1/2 left-3">
      <envelope-icon v-if="type === 'email'" />
    </span>
    <input
      class="appearance-none block w-full py-3 px-4 pl-14 rounded-md bg-gray-200 dark:bg-gray-500 dark:placeholder-gray-300 focus:outline-none"
      :type="type" :placeholder="placeholder" :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)">
  </label>
</template>

<script setup lang="ts">

import { EnvelopeIcon } from '@heroicons/vue/24/solid/'

interface Props {
  label: string
  type: TextInputs
  placeholder?: string
  modelValue: string | number
}

defineProps<Props>()

</script>

<style scoped>

</style>