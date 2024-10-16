<script setup lang="ts">
import { uiSize } from "./config.ts";
import { computed } from "vue";
import { IOptions } from "@/model/common.ts";

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
    default: "disabled",
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
  <NCheckboxGroup v-model:value="value" :size="uiSize">
    <NSpace item-style="display: flex;">
      <NCheckbox
        v-for="item in options"
        :key="item[valueName]"
        :value="item[valueName]"
        :label="item[labelName]"
        :disabled="item[disabledName]"
      />
    </NSpace>
  </NCheckboxGroup>
</template>

<style lang="scss" scope></style>
