<script setup lang="ts">
import { uiSize } from "./config.ts";
</script>

<template>
  <NAvatar :size="uiSize" circle>
    <slot></slot>
  </NAvatar>
</template>

<style lang="scss" scoped></style>
