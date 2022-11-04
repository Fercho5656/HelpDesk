<template>
  <h2>Bienvenido, haz iniciado sesión</h2>
</template>

<script setup lang="ts">
import { User } from '@supabase/gotrue-js';
import { Ref } from 'vue';

const user: Ref<User> = useSupabaseUser();

const auth = useAuth('onlyAuth');
const showAuth = computed(() => !user.value)
</script>