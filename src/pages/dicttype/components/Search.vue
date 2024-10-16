<script setup lang="ts">
import { computed, ref } from "vue";

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

let daterange = ref(null);
const searchHandle = () => {
  emits("search");
};

const resetSearch = () => {
  daterange.value = null;
};

defineExpose({
  resetSearch,
});
</script>

<template>
  <YInput
    v-model="search.dictLabel"
    @keyup.enter="searchHandle"
    placeholder="请输入字典标签"
  ></YInput>
  <YSelect
    v-model="search.status"
    :options="statusOp"
    @keyup.enter="searchHandle"
    placeholder="请选择数据状态"
  ></YSelect>
</template>

<style lang="scss" scoped></style>
