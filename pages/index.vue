<template>
  <div class="bg-gray-50 dark:bg-slate-800 h-screen grid grid-cols-12" v-if="showAuth">
    <login v-if="showLogin" @show-register="showLogin = false" />
    <register v-else @show-login="showLogin = true" />
    <auth-background />
  </div>
  <div v-else>
    <h2>Bienvenido, haz iniciado sesión</h2>
  </div>
</template>

<script setup lang="ts">
import { User } from '@supabase/gotrue-js';
import { Ref } from 'vue';

const user: Ref<User> = useSupabaseUser();
const showLogin = ref<boolean>(true);

const showAuth = computed(() => {
  return !user.value;
})
</script>