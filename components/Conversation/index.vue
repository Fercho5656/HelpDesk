<template>
  <div class="w-full">
    {{ messages }}
  </div>
</template>

<script setup lang="ts">
import { Message } from '@twilio/conversations';

interface Props {
  messages: Message[] | []
}

const props = defineProps<Props>()
</script>

<style scoped>

</style>