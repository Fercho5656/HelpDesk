<template>
  {{ route.params.id }}
</template>

<script setup lang="ts">
const route = useRoute()
definePageMeta({
  middleware: ['check-ticket']
})
</script>

<style scoped>

</style>