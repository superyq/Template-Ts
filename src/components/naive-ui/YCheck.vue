<script setup lang="ts">
import { uiSize } from "./config.ts";
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: null,
    required: true,
  },
});

const emits = defineEmits(["update:modelValue"]);

let value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});
</script>

<template>
  <NCheckbox class="u__mr-5" v-model:checked="value" :size="uiSize"></NCheckbox>
</template>

<style lang="scss" scope></style>
