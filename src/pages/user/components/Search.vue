<script setup lang="ts">
import { computed, ref } from "vue";
import { addDateRange, parseTime } from "@/utils/index.ts";

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
const changeDate = (value: any) => {
  let dateparams: any = search.value;
  if (!!value) {
    let _dateRange = value.map((item: any) => parseTime(item, "{y}-{m}-{d}"));
    dateparams = addDateRange(search.value, _dateRange);
  } else {
    dateparams.params && delete dateparams.params;
  }
  emits("update:modelaValue", dateparams);
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
    v-model="search.userName"
    @keyup.enter="searchHandle"
    placeholder="请输入用户名"
  ></YInput>
  <YInput
    v-model="search.phone"
    @keyup.enter="searchHandle"
    placeholder="请输入手机号"
  ></YInput>
  <YSelect
    v-model="search.status"
    :options="statusOp"
    @keyup.enter="searchHandle"
    placeholder="请选择用户状态"
  ></YSelect>
  <YDate
    width="300px"
    v-model="daterange"
    @update:value="changeDate"
    start-placeholder="创建开始时间"
    end-placeholder="创建结束时间"
  ></YDate>
</template>

<style lang="scss" scoped></style>
