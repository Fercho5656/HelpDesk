<template>
  <form @submit.prevent="submitRegister"
    class="flex flex-col w-full m-auto gap-y-8 col-span-12 md:col-span-7 md:w-9/12 p-5">
    <h2 class="dark:text-gray-50 mb-3 text-2xl font-bold text-center">Crear Cuenta</h2>
    <div class="flex flex-col gap-y-10">
      <ui-input type="text" label="Nombre Completo" placeholder="John Doe" v-model="fullName" />
      <ui-input type="email" label="Correo Electrónico" placeholder="name@pfatequila.com" v-model="email" />
      <ui-password-input label="Contraseña" v-model="password" />
      <ui-password-input label="Confirmar Contraseña" v-model="confirmPassword" />
      <ui-input type="date" label="Fecha de nacimiento" v-model="birthday" />
    </div>
    <button class="w-full py-3 text-lg dark:bg-cyan-900 bg-slate-800 text-gray-50 rounded-xl">Crear Cuenta</button>
    <p class="flex justify-center dark:text-gray-50 text-lg">¿Ya tienes una cuenta?&nbsp; <nuxt-link to="#"
        @click="$emit('show-login')"
        class="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">Inicia Sesión
      </nuxt-link>
    </p>
  </form>
</template>

<script setup lang="ts">
import { signUp } from '../services/auth'

defineEmits<{
  (e: 'show-login'): void
}>()

const fullName = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const confirmPassword = ref<string>('')
const birthday = ref<string>('')

const client = useSupabaseClient()

const isEmailValid = computed(() => {
  return email.value.split('@')[1] === 'pfatequila.com'
})

const submitRegister = async () => {
  if (!isEmailValid.value) {
    return alert('El correo electrónico no es válido')
  }
  const userInfo = {
    email: email.value,
    password: password.value,
    fullName: fullName.value,
    birthday: birthday.value
  }
  const [user, session, error] = await signUp(client, userInfo)

  console.log(user)
  console.log(session)
  console.log(error)
}
</script>

<style scoped>

</style>