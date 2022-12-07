<template>
  <component :is="props.heading" class="font-semibold" :class="textStyles">
    <slot />
  </component>
</template>

<script setup lang="ts">
interface Props {
  heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const props = defineProps<Props>()

const textSizes = {
  h1: 'text-5xl',
  h2: 'text-4xl',
  h3: 'text-3xl',
  h4: 'text-2xl',
  h5: 'text-xl',
  h6: 'text-lg',
}

const textStyles = computed(() => {
  return textSizes[props.heading]
})
</script>

<style scoped>

</style>