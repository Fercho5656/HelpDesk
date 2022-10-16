<template>
    <div :class="{'dark': dark}">
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import { useUserSettings } from './store/userSettings.store';

const userStore = useUserSettings()
const dark = ref<boolean>(userStore.getIsDarkMode)
onMounted(() => {
    console.log('dark', dark.value)
    dark.value = userStore.getIsDarkMode
})
</script>

<style scoped>

</style>