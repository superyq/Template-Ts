<script setup lang="ts">
import { uiSize } from "./config.ts";
import { computed } from "vue";
import { IOptions } from '@/model/common.ts';

const props = defineProps({
  modelValue: {
    type: null,
    required: true,
  },
  options: {
    type: Array<IOptions>,
    required: true,
  },
  valueName: {
    type: String,
    default: "value",
  },
  labelName: {
    type: String,
    default: "label",
  },
  disabledName: {
    type: String,
    default: 'disabled'
  }
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
  <n-radio-group v-model:value="value" :size="uiSize">
    <n-radio
      v-for="item in options"
      :key="item[valueName]"
      :value="item[valueName]"
      :disabled="item[disabledName]"
    >
      {{ item[labelName] }}
    </n-radio>
  </n-radio-group>
</template>

<style lang="scss" scoped></style>
