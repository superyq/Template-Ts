<script setup lang="ts">
import { computed } from "vue";
import { uiSize } from "./config.ts";

let height = computed(() => {
  const w_h = window.innerHeight;
  if (w_h <= 740) {
    return 400;
  }
  if (w_h > 740 && w_h <= 900) {
    return 500;
  }
  if (w_h > 900) {
    return 600;
  }
});
let scrollX = computed(() => {
  return window.innerWidth - 195;
});
</script>

<template>
  <NDataTable
    :single-line="false"
    :size="uiSize"
    striped
    :max-height="height"
    :scroll-x="scrollX"
  ></NDataTable>
</template>

<style lang="scss" scope></style>
