<template>
  <div class="flex flex-col gap-y-3 w-full p-3 overflow-y-scroll">
    <conversation-twilio-message v-for="message in messages" :key="message.sid" :is-author="message.author === userId"
      :message="message" />
  </div>
</template>

<script setup lang="ts">
import IMessage from '~~/interfaces/IMessage'
import { useUserStore } from '~~/store/user.store';

interface Props {
  messages: Array<IMessage>
}

const props = defineProps<Props>()

const userStore = useUserStore()
const userId = computed(() => userStore.getUserId)

console.log(props.messages)
</script>

<style scoped>

</style>