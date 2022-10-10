<template>
  <label class="relative block text-md font-medium text-gray-900 dark:text-gray-300">
    <p class="absolute top-0 -translate-y-full text-md">{{label}}</p>
    <select @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="w-full py-3 px-4 text-md font-semibold dark:text-gray-200 bg-gray-200 dark:bg-gray-500 dark:placeholder-gray-300 rounded-md">
      <slot />
    </select>
  </label>
</template>

<script setup lang="ts">
interface Props {
  label: string
  modelValue: string | number
}

defineProps<Props>()
</script>