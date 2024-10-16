<script setup lang="ts">
import { computed } from "vue";
import { uiSize } from "./config.ts";

const props = defineProps({
  modelValue: {
    type: null,
  },
});
let emits = defineEmits(["update:modelValue"]);

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
  <NSwitch v-model:value="value" :size="uiSize" clearable>
    <template #checked-icon>
      <slot name="checked-icon"></slot>
    </template>
    <template #unchecked-icon>
      <slot name="unchecked-icon"></slot>
    </template>
  </NSwitch>
</template>
