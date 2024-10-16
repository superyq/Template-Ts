<script setup lang="ts">
import { uiButtonSize } from "./config.ts";

defineProps({
  icon: {
    type: String,
    default: "",
  },
  iconRight: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <NButton :size="uiButtonSize" :icon-placement="iconRight ? 'right' : 'left'">
    <slot></slot>
    <template #icon v-if="icon">
      <svg-icon :name="icon"></svg-icon>
    </template>
  </NButton>
</template>

<style lang="scss">
.n-button__content {
  font-size: 12px !important;
}
</style>
