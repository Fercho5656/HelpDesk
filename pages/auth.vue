<template>
  <div class="grid grid-cols-12">
    <login v-if="showLogin" @show-register="showLogin = false" />
    <register v-else @show-login="showLogin = true" />
    <auth-background />
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  layout: 'auth',
})

const auth = useAuth('onlyGuest')
const showLogin = ref<boolean>(true);
</script>

<style scoped>

</style>