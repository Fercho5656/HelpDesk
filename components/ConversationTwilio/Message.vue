<template>
  <div class="flex flex-col" :class="isAuthor ? 'self-end' : 'self-start'">
    <div :class="isAuthor ? 'bg-emerald-800 self-end rounded-tr-none' : 'bg-gray-800 self-start rounded-tl-none'" class="relative w-fit rounded-md text-gray-200 p-3">
      <icons-message-arrow class="absolute top-0" :class="isAuthor ? '-right-2 -scale-x-100 text-emerald-800' : '-left-2 text-gray-800'" />
      <p> {{ message.body }}</p>
    </div>
    <p :class="isAuthor ? 'self-end' : 'self-start'" class="dark:text-gray-200">{{ message.attributes.identity }} {{date}}</p>
  </div>
</template>

<script setup lang="ts">
import IMessage from '~~/interfaces/IMessage';

interface Props {
  isAuthor: boolean
  message: IMessage
}

const props = defineProps<Props>()

const date = computed(() => new Date(props.message.dateCreated).toDateString())
</script>

<style scoped>

</style>