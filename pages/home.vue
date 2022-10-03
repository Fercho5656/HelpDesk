<template>
  <h1>Bienvenido!! haz iniciado sesión</h1>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['protect-routes']
})

const user = useSupabaseUser()

onMounted(() => {
  watchEffect(() => {
    if (!user.value) {
      navigateTo('/')
    }
    console.log(user.value)
  })
})
</script>

<style scoped>

</style>