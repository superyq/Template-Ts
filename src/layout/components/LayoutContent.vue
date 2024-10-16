<script setup lang="ts">
import { useActionStore } from "@/store/action.ts";
import { computed } from "vue";

const actionStore = useActionStore();
let refreh = computed(() => {
  return actionStore.refreh;
});
</script>

<template>
  <div class="layout-content">
    <RouterView v-slot="{ Component, route }">
      <Transition mode="out-in" :name="route.meta.transition || 'mainFade'">
        <component :is="Component" :key="route.path" v-if="refreh"></component>
      </Transition>
    </RouterView>
  </div>
</template>

<style lang="scss" scoped>
.layout-content {
  padding: 20px;
  margin: 10px;
  min-height: calc(100vh - 170px);
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  -webkit-box-shadow: rgba(0, 0, 0, 0.047) 0 0 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.047);
}
.mainFade-enter-from {
  transform: translate(-80px);
  opacity: 0;
}

.mainFade-leave-to {
  transform: translate(80px);
  opacity: 0;
}

.mainFade-leave-from,
.mainFade-enter-to {
  transform: translate(0px);
  opacity: 1;
}

.mainFade-enter-active {
  transition: all 0.1s ease;
}

.mainFade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.6, 0.6, 1);
}
</style>
