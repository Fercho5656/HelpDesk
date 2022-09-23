<template>
  <div :class="{'dark': darkMode}">
    <div class="bg-gray-50 dark:bg-slate-800 h-screen grid grid-cols-12">
      <div class="flex flex-col col-span-12 md:col-span-7">
        <nuxt-link class="p-3" to="/">
          <icons-campo-azul />
        </nuxt-link>
        <form @submit.prevent class="w-full h-full flex flex-col self-center justify-center gap-y-5 md:w-9/12 p-5">
          <h2 class="dark:text-gray-50 mb-3 text-2xl font-bold text-center">Bienvenido, inicie sesión</h2>
          <div class="flex flex-col gap-y-3">
            <ui-input type="email" label="Correo Electrónico" placeholder="name@pfatequila.com" v-model="email" />
            <ui-password-input label="Contraseña" v-model="password" />
          </div>
          <button @click="darkMode = !darkMode"
            class="w-full py-3 dark:bg-cyan-900 bg-slate-800 text-gray-50 rounded-xl">Iniciar Sesión</button>
          <p class="flex justify-center dark:text-gray-50">¿No tienes una cuenta?&nbsp; <nuxt-link to="/register"
              class="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">Regístrate
            </nuxt-link>
          </p>
        </form>
      </div>
      <div class="hidden md:block col-span-5">
        <nuxt-img class="h-full object-cover" src="/auth-bg.jpeg" placeholder alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const darkMode = ref(false)
const email = ref<string>('')
const password = ref<string>('')
</script>