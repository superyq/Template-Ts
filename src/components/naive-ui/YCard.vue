<script setup lang="ts">
import { uiSize, uiCardWidth, uiCardBordered } from "./config.ts";
import { computed, inject } from "vue";

const props = defineProps({
  width: {
    type: String,
    default: uiCardWidth,
  },
});

const emits = defineEmits(["cancel", "submit"]);

const style = computed(() => {
  return {
    width: props.width == "auto" ? "100%" : `${props.width}`,
  };
});

const cancelHandle = () => {
  emits("cancel");
};
const submitHandle = () => {
  emits("submit");
};

const btnload = inject("btnload");
</script>

<template>
  <NCard :size="uiSize" :style="style" :bordered="uiCardBordered" closable>
    <slot></slot>
    <template #action>
      <div class="u__flex">
        <slot name="action"></slot>
        <YButton class="u__mr-10" @click="cancelHandle">取消</YButton>
        <YButton type="success" @click="submitHandle" :loading="btnload"
          >确定</YButton
        >
      </div>
    </template>
  </NCard>
</template>

<style lang="scss" scope></style>
