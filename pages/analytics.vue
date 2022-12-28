<template>
  <div>
    <ui-heading heading="h1">Analytics</ui-heading>
    <bar :data="ticketCountByPriorityData" :options="ticketCountByPriorityOptions" />
    <!-- <bar :data="data" :options="options" /> -->
  </div>
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'

const { ticketCountByPriorityData, ticketCountByPriorityOptions } = await useAnalytics()

</script>

<style scoped>

</style>