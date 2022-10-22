<template>
  <label class="relative block text-sm font-medium text-gray-900 dark:text-gray-300">
    <p class="absolute top-0 -translate-y-full text-md">{{label}}</p>
    <textarea
      class="appearance-none block w-full py-3 px-4 text-md rounded-md bg-gray-200 dark:bg-gray-500 dark:placeholder-gray-300 focus:outline-none"
      :placeholder="placeholder" :value="modelValue" @input="onInput" rows="5"></textarea>
  </label>
</template>

<script setup lang="ts">

interface Props {
  label?: string
  placeholder?: string
  modelValue?: string | number
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