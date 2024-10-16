<script setup lang="ts">
import { computed } from "vue";
import { uiSize, uiSelectWidth } from "./config.ts";

const props = defineProps({
  modelValue: {
    type: null,
    required: true,
  },
  width: {
    type: String,
    default: uiSelectWidth,
  },
});
let emits = defineEmits(["update:modelValue"]);

const style = computed(() => {
  return {
    width: props.width == "auto" ? "100%" : `${props.width}`,
  };
});
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
  <NSelect
    v-model:value="value"
    :style="style"
    :size="uiSize"
    clearable
  ></NSelect>
</template>
