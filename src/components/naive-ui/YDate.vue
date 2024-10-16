<script setup lang="ts">
import { uiSize, uiDateWidth } from "./config.ts";
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: null,
    required: true,
  },
  width: {
    type: String,
    default: uiDateWidth,
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
const style = computed(() => {
  return {
    width: props.width == "auto" ? "100%" : `${props.width}`,
  };
});
</script>

<template>
  <NDatePicker type="daterange" v-model:value="value" :size="uiSize" :style="style" clearable />
</template>

<style lang="scss" scope></style>
