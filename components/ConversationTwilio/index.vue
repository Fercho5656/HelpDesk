<template>
  <div class="flex flex-col gap-y-3 w-full">
    <conversation-twilio-message v-for="message in messages" :key="message.sid" :is-author="message.author === userId">
      <p>{{ message.author }}</p>
      <p>{{ message.body }}</p>
    </conversation-twilio-message>
  </div>
</template>

<script setup lang="ts">
import IMessage from '~~/interfaces/IMessage'
import { useUserStore } from '~~/store/user.store';
const userStore = useUserStore()
const userId = computed(() => userStore.getUserId)
interface Props {
  messages: Array<IMessage>
}

const props = defineProps<Props>()
console.log(props.messages)
</script>

<style scoped>

</style>