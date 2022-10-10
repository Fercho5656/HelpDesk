<template>
  <label class="relative block text-sm font-medium text-gray-900 dark:text-gray-300">
    <p class="absolute top-0 -translate-y-full text-md">{{label}}</p>
    <span class="absolute cursor-pointer top-1/2 w-7 h-7 -translate-y-1/2 left-3" @click="onClick">
      <eye-slash-icon v-if="showPassword" />
      <eye-icon v-else />
    </span>
    <input
      class="appearance-none block w-full py-3 px-4 pl-14 rounded-md text-md bg-gray-200 dark:bg-gray-500 dark:placeholder-gray-300 focus:outline-none"
      :type="showPassword ? 'text' : 'password'" :placeholder="placeholder" :value="modelValue" @input="onInput">
  </label>
</template>

<script setup lang="ts">

import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid/'

interface Props {
  label: string
  placeholder?: string
  modelValue: string | number
}

defineProps<Props>()
const emits = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const onClick = (e: MouseEvent): MouseEvent => {
  showPassword.value = !showPassword.value
  return e
}

const onInput = (e: Event): Event => {
  emits('update:modelValue', (e.target as HTMLInputElement).value)
  return e
}
const showPassword = ref<boolean>(false)
</script>

<style scoped>

</style>