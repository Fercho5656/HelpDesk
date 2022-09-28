<template>
  <div :class="{'dark': darkMode}">
    <login />
  </div>
</template>

<script setup lang="ts">
const darkMode = ref(false)
</script>