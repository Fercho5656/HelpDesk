<template>
  <div class="col-span-8 md:col-span-9 xl:col-span-10">
    <h2>Bienvenido, haz iniciado sesión</h2>
  </div>
</template>

<script setup lang="ts">
import { User } from '@supabase/gotrue-js';
import { Ref } from 'vue';

const user: Ref<User> = useSupabaseUser();

const showAuth = computed(() => !user.value)
</script>