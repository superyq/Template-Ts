<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});
const emits = defineEmits(["update:modelaValue", "search"]);
const search = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelaValue", value);
  },
});

const statusOp = [
  {
    label: "启用",
    value: 1,
  },
  {
    label: "禁用",
    value: 0,
  },
];

const searchHandle = () => {
  emits("search");
};
</script>

<template>
  <YInput
    v-model="search.menuName"
    @keyup.enter="searchHandle"
    placeholder="请输入菜单名"
  ></YInput>
  <YSelect
    v-model="search.menuState"
    :options="statusOp"
    @keyup.enter="searchHandle"
    placeholder="请选择菜单状态"
  ></YSelect>
</template>

<style lang="scss" scoped></style>
