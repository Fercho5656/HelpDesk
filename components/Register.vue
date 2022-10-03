<template>
  <div class="bg-gray-50 dark:bg-slate-800 h-screen grid grid-cols-12">
    <div class="flex flex-col col-span-12 md:col-span-7">
      <nuxt-link class="p-3" to="/" @click="darkMode = !darkMode">
        <icons-campo-azul />
      </nuxt-link>
      <form @submit.prevent="submigRegister"
        class="w-full h-full flex flex-col self-center justify-center gap-y-12 md:w-9/12 p-5">
        <h2 class="dark:text-gray-50 mb-3 text-2xl font-bold text-center">Crear Cuenta</h2>
        <div class="flex flex-col gap-y-10">
          <u-i-input type="email" label="Correo Electrónico" placeholder="name@pfatequila.com" v-model="email" />
          <u-i-password-input label="Contraseña" v-model="password" />
        </div>
        <button class="w-full py-3 dark:bg-cyan-900 bg-slate-800 text-gray-50 rounded-xl">Crear Cuenta</button>
        <p class="flex justify-center dark:text-gray-50">¿Ya tienes una cuenta?&nbsp; <nuxt-link to="/"
            class="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">Inicia Sesión
          </nuxt-link>
        </p>
      </form>
    </div>
    <div class="hidden md:block col-span-5">
      <nuxt-img class="h-full object-cover" src="/auth-bg.jpeg" placeholder alt="" />
    </div>
  </div>

</template>

<script setup lang="ts">
import { login, signUp } from '../services/auth'

definePageMeta({
  middleware: ['protect-routes']
})

const user = useSupabaseUser()

onMounted(() => {
  watchEffect(() => {
    if (user.value) {
      navigateTo('home')
    }
  })
})

const darkMode = ref(false)
const email = ref<string>('')
const password = ref<string>('')

const client = useSupabaseClient()

const isEmailValid = computed(() => {
  return email.value.split('@')[1] === 'pfatequila.com'
})

const submigRegister = async () => {
  if (!isEmailValid.value) {
    return alert('El correo electrónico no es válido')
  }
  const [user, error] = await signUp(client, email.value, password.value)
  console.log(error)
}
</script>

<style scoped>

</style>