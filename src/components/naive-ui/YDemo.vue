<script setup lang="ts">
import YButton from "./YButton.vue";

defineProps({
  demo: {
    type: String,
    required: true,
  },
});
const change = () => {};
</script>

<template>
  <div>
    <YButton @click="change">btn</YButton>
    {{ demo }}
  </div>
</template>

<style lang="scss" scope></style>
