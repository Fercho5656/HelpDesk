<template>
  <form @submit.prevent="submitLogin"
    class="flex flex-col w-full max-w-xl m-auto gap-y-12 col-span-12 md:col-span-7 md:w-9/12 p-5">
    <h2 class="dark:text-gray-50 mb-3 text-2xl font-bold text-center">Bienvenido, inicie sesión</h2>
    <div class="flex flex-col gap-y-10">
      <ui-input type="email" label="Correo Electrónico" placeholder="name@pfatequila.com" v-model="email" />
      <ui-password-input label="Contraseña" v-model="password" />
    </div>
    <button class="w-full py-3 text-md dark:bg-cyan-900 bg-slate-800 text-gray-50 rounded-xl">Iniciar Sesión</button>
    <p class="flex justify-center text-md dark:text-gray-50">¿No tienes una cuenta?&nbsp; <nuxt-link to="#"
        @click="$emit('show-register')"
        class="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">Regístrate
      </nuxt-link>
    </p>
  </form>
</template>

<script setup lang="ts">
import { useConversationStore } from '~~/store/conversation.store';
import { useStorage } from '@vueuse/core'
import { login } from '../services/auth'

defineEmits<{
  (e: 'show-register'): void
}>()

const email = ref<string>('')
const password = ref<string>('')

const conversationStore = useConversationStore()
const client = useSupabaseClient()

const isEmailValid = computed(() => {
  return email.value.split('@')[1] === 'pfatequila.com'
})

const submitLogin = async () => {
  /* if (!isEmailValid.value) {
    return alert('El correo electrónico no es válido')
  } */
  const [user, error] = await login(client, email.value, password.value)
  const twilioAccessToken = await useFetch('/api/twilio/accesstoken', {
    method: 'POST',
    body: JSON.stringify({
      identity: user?.id
    })
  })
  console.log(twilioAccessToken.data.value)
  const twilioToken = useStorage('twilioToken', twilioAccessToken.data.value)
  conversationStore.setTwilioAccessToken(twilioAccessToken.data.value)
  console.log(error)
  console.log(user)
}
</script>

<style scoped>

</style>