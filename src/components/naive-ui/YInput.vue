<script setup lang="ts">
import { computed } from "vue";
import { uiSize, uiInputWidth } from "./config.ts";
import { NInput, NInputNumber } from "naive-ui";

const props = defineProps({
  modelValue: {
    type: null,
    required: true,
  },
  width: {
    type: String,
    default: uiInputWidth,
  },
  isNumber: {
    type: Boolean,
    default: false,
  },
});
let emits = defineEmits(["update:modelValue"]);

const value = computed({
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
const component = computed(() => {
  return props.isNumber ? NInputNumber : NInput;
});
</script>

<template>
  <component
    :is="component"
    v-model:value="value"
    :size="uiSize"
    :style="style"
    clearable
  >
    <template #prefix>
      <slot name="prefix"></slot>
    </template>
    <template #suffix>
      <slot name="suffix"></slot>
    </template>
  </component>
</template>
