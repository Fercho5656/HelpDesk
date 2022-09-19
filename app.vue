<template>
  <div :class="{'dark': darkMode}" class="h-screen grid grid-cols-12">
    <div class="flex flex-col col-span-12 md:col-span-6">
      <nuxt-link to="/">
        <img class="w-40" src="./assets/tequila-campo-azul.svg" alt="">
      </nuxt-link>
      <form class="w-full md:w-80 p-5 my-auto h-full self-center">
        <h2 class="text-2xl font-bold">Bienvenido, inicie sesión</h2>
        <label for="input-group-1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Correo Electrónico
        </label>
        <div class="relative mb-6">
          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
              viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
            </svg>
          </div>
          <input type="text" id="input-group-1"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@pfatequila.com">
        </div>
        <label for="website-admin"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Contraseña</label>
        <div class="flex">
          <span
            class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            @
          </span>
          <input type="password" id="website-admin"
            class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>

        <div class="flex items-center mb-4">
          <input id="default-checkbox" type="checkbox" value=""
            class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
          <label for="default-checkbox"
            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Recuérdame</label>
          <nuxt-link to="#"
            class="ml-auto text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
            ¿Olvidaste tu contraseña?
          </nuxt-link>
        </div>
        <button class="w-full py-3 bg-gray-900 text-white rounded-xl">Iniciar Sesión</button>
        <p class="flex justify-center">¿No tienes una cuenta?&nbsp; <nuxt-link to="/register"
            class="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">Regístrate</nuxt-link>
        </p>
      </form>
    </div>
    <div class="hidden md:block md:col-span-6">
      <nuxt-img class="h-full object-cover" src="https://i.imgur.com/ylXWWmV.jpeg" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
const darkMode = ref(false)
</script>