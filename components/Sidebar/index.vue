<template>
  <aside class="flex-col p-5">
    <icons-campo-azul class="mx-auto mb-10" />
    <ul class=" flex flex-col items-center md:items-start gap-y-5">
      <li v-for="route in routes" :key="route.name"
        class="w-full flex justify-center md:justify-start hover:bg-slate-700 rounded-full transition-all">
        <nuxt-link class="w-full flex items-center justify-center md:justify-start gap-x-3 px-5 py-2" :to="route.path">
          <component class="w-10 h-10 fill-black dark:fill-white" :is="route.icon" />
          <p class="hidden md:block text-black dark:text-white text-xl">{{ route.name }}</p>
        </nuxt-link>
      </li>
    </ul>
    <sidebar-account-menu class="mt-auto" :src="profilePic" :username="username" />
  </aside>

</template>

<script setup lang="ts">
import { useUserStore } from '~~/store/user.store';
import { useConversationStore } from '~~/store/conversation.store';
import { useStorage } from '@vueuse/core';

interface Props {
  routes: {
    name: string
    icon: any
    path: string
  }[]
}

defineProps<Props>()

const userState = useUserStore()
const twilioAccessToken = useStorage('twilioToken', '')
const conversationStore = useConversationStore()
conversationStore.setTwilioAccessToken(twilioAccessToken.value)
const username = computed(() => userState.getUser?.user_metadata.fullName)
const [profilePic, profilePicError] = userState.getProfilePicture
</script>

<style scoped>

</style>