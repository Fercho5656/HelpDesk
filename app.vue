<template>
  <div :class="{'dark': darkMode}">
    <div class="bg-gray-50 dark:bg-slate-800 h-screen grid grid-cols-12">
      <div class="flex flex-col col-span-12 md:col-span-6">
        <nuxt-link to="/">
        <img class="w-40" src="./assets/tequila-campo-azul.svg" alt="">
      </nuxt-link>
      <form @submit.prevent class="w-full h-5/6 flex flex-col self-center justify-center gap-y-3.5 md:w-9/12 p-5">
        <h2 class="dark:text-gray-50 text-2xl font-bold text-center">Bienvenido, inicie sesión</h2>
        <div>
          <label class="block text-sm font-medium text-gray-900 dark:text-gray-300">
            Correo Electrónico
            <input class="block mt-1 w-full p-2 rounded-md bg-gray-200 dark:bg-gray-500 dark:placeholder-gray-300" type="email" placeholder="Ejemplo: name@pfatequila.com">
          </label>
          <label class="block text-sm font-medium text-gray-900 dark:text-gray-300">
            Contraseña
            <input class="block mt-1 w-full p-2 rounded-md bg-gray-200 dark:bg-gray-500 dark:placeholder-gray-300" type="password">
          </label>
        </div>
        <button @click="darkMode = !darkMode" class="w-full py-3 dark:bg-cyan-900 bg-slate-800 text-gray-50 rounded-xl">Iniciar Sesión</button>
        <p class="flex justify-center dark:text-gray-50">¿No tienes una cuenta?&nbsp; <nuxt-link to="/register"
            class="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">Regístrate</nuxt-link>
        </p>
      </form>
    </div>
    <div class="hidden md:block md:col-span-6">
      <nuxt-img class="h-full object-cover" src="/auth-bg.jpeg" placeholder alt="" />
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
const darkMode = ref(false)
</script>