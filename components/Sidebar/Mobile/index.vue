<template>
  <div class="w-full flex justify-around">
    <sidebar-mobile-frame v-for="route in props.routes" :key="route.name" :route="route" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  routes: {
    name: string
    icon: any
    path: string
  }[]
}

const props = defineProps<Props>()
</script>

<style scoped>

</style>