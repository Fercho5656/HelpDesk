<template>
  <teleport to="body">
    <transition name="fade">
      <div class="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-50" v-show="show">
        <div ref="modal" class="relative rounded-md bg-gray-500 dark:bg-slate-500 p-12">
          <button @click="emits('close')" class="absolute top-3 right-3">
            <x-mark-icon class="w-5 h-5" />
          </button>
          <slot />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/solid';
interface Props {
  show: boolean;
}
const props = defineProps<Props>();
const emits = defineEmits(["close"]);
const modal = ref<HTMLElement>()
onClickOutside(modal, () => {
  emits("close");
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>