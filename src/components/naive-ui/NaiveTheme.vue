<script setup lang="ts">
import { zhCN, dateZhCN } from "naive-ui";
import { useThemeStore } from "@/store/theme.ts";
import { computed } from "vue";

const themeStore = useThemeStore();
const theme = computed(() => {
  return themeStore.theme;
});
</script>

<template>
  <NConfigProvider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
    <slot></slot>
  </NConfigProvider>
</template>

<style lang="scss" scope></style>
