<template>
  <div class="grid grid-cols-2 grid-rows-2">
    <ticket-priority-help-frame priority="high">
      <template v-slot:header>
        <p>Alta</p>
      </template>
      <template v-slot:content>
        <p>Si es importante pero no urgente</p>
      </template>
    </ticket-priority-help-frame>
    <ticket-priority-help-frame priority="urgent">
      <template v-slot:header>
        <p>Urgente</p>
      </template>
      <template v-slot:content>
        <p>Si es importante y necesita ser solucionado a la brevedad</p>
      </template>
    </ticket-priority-help-frame>
    <ticket-priority-help-frame priority="low">
      <template v-slot:header>
        <p>Baja</p>
      </template>
      <template v-slot:content>
        <p>Si no es importante y/o no urgente</p>
      </template>
    </ticket-priority-help-frame>
    <ticket-priority-help-frame priority="medium">
      <template v-slot:header>
        <p>Media</p>
      </template>
      <template v-slot:content>
        <p>Si no es importante pero necesita ser solucionado</p>
      </template>
    </ticket-priority-help-frame>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>

</style>