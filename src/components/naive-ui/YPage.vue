<script setup lang="ts">
import { uiSize } from "./config.ts";
import { PropType, computed } from "vue";
import { IPages } from "@/model/common.ts";

defineOptions({
  inheritAttrs: false,
});
const props = defineProps({
  modelValue: {
    type: Object as PropType<IPages>,
    required: true,
  },
});
const emits = defineEmits(["update:modelValue"]);

let pages = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});
</script>

<template>
  <div class="u__flex-ac">
    <NPagination
      v-bind="$attrs"
      v-model:page="pages.page"
      v-model:page-size="pages.pageSize"
      :page-sizes="pages.pageSizes"
      :item-count="pages.total"
      show-size-picker
      :size="uiSize"
    />
    <span>共{{ pages.total }}条</span>
  </div>
</template>

<style lang="scss" scoped>
span {
  margin-left: 10px;
  font-size: 13px;
}
</style>
