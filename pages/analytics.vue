<template>
  <div class="p-5 flex gap-8 justify-center sm:justify-start flex-wrap">
    <bar class="max-w-sm max-h-96" :data="ticketCountByPriorityData" :options="ticketCountByPriorityOptions" />
    <pie class="max-w-sm max-h-96" :data="ticketSolvedPercentageData" :options="ticketSolvedPercentageOptions" />
    <!-- <bar :data="data" :options="options" /> -->
  </div>
</template>

<script setup lang="ts">
import { Bar, Pie } from 'vue-chartjs'
import useTicketCount from '~~/composables/analytics/useTicketCount';
import useTicketSolvedPercentage from '~~/composables/analytics/useTicketSolvedPercentage';

const { ticketCountByPriorityData, ticketCountByPriorityOptions } = useTicketCount();
const { ticketSolvedPercentageData, ticketSolvedPercentageOptions } = useTicketSolvedPercentage()

</script>

<style scoped>

</style>