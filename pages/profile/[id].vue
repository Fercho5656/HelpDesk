<template>
  <h1>Profile {{route.params.id}}</h1>
</template>

<script setup>
const route = useRoute()
definePageMeta({
  middleware: ['check-profile'],
})
</script>

<style scoped>

</style>