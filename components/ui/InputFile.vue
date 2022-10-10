<template>
  <div class="flex items-center justify-center gap-x-5">
    <div class="shrink-0">
      <img class="object-cover w-16 h-16 rounded-full" :src="profilePicUrl" alt="Foto del Perfíl" />
    </div>
    <label class="block">
      <span class="sr-only">Seleccionar Archivo</span>
      <input type="file"
        class="block w-full text-md text-gray-400 text-opacity-0 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-md file:font-semibold dark:file:bg-gray-500 dark:file:text-gray-300 hover:dark:file:bg-gray-600"
        @change="onChange" />
    </label>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label?: string
  modelValue: File
}

defineProps<Props>()
const emits = defineEmits(['update:modelValue'])

const profilePicUrl = ref<string>("/default-profile-pic.png")

const onChange = (e: Event): Event => {
  const file = (e.target as HTMLInputElement).files[0]
  profilePicUrl.value = URL.createObjectURL(file)
  emits('update:modelValue', file)
  return e
}
</script>

<style scoped>

</style>