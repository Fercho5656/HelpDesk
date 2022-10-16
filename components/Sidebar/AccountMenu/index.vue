<template>
  <div ref="target">
    <sidebar-account-menu-hover-card v-if="showHoverCard" :img="src" :username="firstName" />
    <button @click="showHoverCard = !showHoverCard" class="rounded-full dark:hover:bg-gray-700 transition-all">
      <sidebar-account-menu-user-cell :img="src" :username="firstName" />
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  src: string
  username: string
}

const props = defineProps<Props>()

const firstName = computed(() => props.username.split(' ')[0])
const showHoverCard = ref(true)
const target = ref(null)

onClickOutside(target, () => {
  showHoverCard.value = false
})
</script>

<style scoped>

</style>