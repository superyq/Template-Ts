<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { NPopover } from "naive-ui";
import SvgIcon from "@/components/SvgIcon.vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});
const emits = defineEmits(["update:modelValue"]);

onMounted(() => {
  iconPath.value = props.modelValue;
});

let middleware = computed(() => {
  return props.modelValue;
});
watch(middleware, (newValue) => {
  iconPath.value = newValue;
});

const iconsPath = import.meta.glob("@/assets/svg/*.svg");
const icons = Object.keys(iconsPath).map((item) =>
  item.replace(/\/src\/assets\/svg\//, "").replace(/\.svg/, "")
);

let iconPath = ref("");
let selectHandle = (icon: any) => {
  iconPath.value = icon;
  show.value = false;
};
let handleUpdateShow = (value: any) => {
  !value && (show.value = false);
};

let show = ref(false);
let showChange = () => {
  show.value = true;
};

watch(iconPath, (newValue) => {
  emits("update:modelValue", newValue);
});

let resetPath = () => {
  iconPath.value = "";
};
defineExpose({
  resetPath,
});
</script>

<template>
  <NPopover
    :show="show"
    trigger="click"
    placement="bottom-start"
    @update:show="handleUpdateShow"
  >
    <template #trigger>
      <YInput v-model="iconPath" @click="showChange">
        <template #prefix>
          <SvgIcon v-show="iconPath" :name="iconPath"></SvgIcon>
        </template>
      </YInput>
    </template>
    <div class="icons-box">
      <div
        v-for="(icon, index) in icons"
        :key="index"
        @click="selectHandle(icon)"
      >
        <SvgIcon :name="icon"></SvgIcon>
        <span>{{ icon }}</span>
      </div>
    </div>
  </NPopover>
</template>

<style lang="scss" scoped>
.icons-box {
  display: flex;
  flex-wrap: wrap;
  width: 360px;
  & > div {
    margin-top: 5px;
    width: 120px;
    cursor: pointer;
    span {
      margin-left: 5px;
    }
  }
}
</style>
