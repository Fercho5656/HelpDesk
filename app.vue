<template>
    <div :class="dark ? 'dark' : ''">
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
const { dark } = useUserConfig()

</script>

<style scoped>

</style>