<template>
  <nuxt-link :to="props.route.path">
    <component class="w-10 h-10 fill-black dark:fill-white" :is="props.route.icon">
      <p class="text-black dark:text-white text-xl">{{ props.route.name }}</p>
    </component>
  </nuxt-link>
</template>

<script setup lang="ts">
interface Props {
  route: {
    name: string
    icon: any
    path: string
  }
}

const props = defineProps<Props>()
</script>

<style scoped>

</style>