<script setup lang="ts">
import { ref, watch } from "vue";
import screenfull from "screenfull";
import SvgIcon from "@/components/SvgIcon.vue";
import { useActionStore } from "@/store/action.ts";
import { useThemeStore } from "@/store/theme.ts";

const actionStore = useActionStore();
const themeStore = useThemeStore();

const badgeValue = ref(3);

const onScreenFull = () => {
  if (!screenfull.isEnabled) {
    window.$msg.error("当前浏览器不支持全屏操作");
    return false;
  }
  screenfull.toggle();
};

const onRefrehRoute = () => {
  actionStore.onRefreh();
};

let switchTheme = ref(false);
watch(
  () => switchTheme.value,
  () => {
    themeStore.changeTheme();
  }
);
</script>

<template>
  <div class="action-items-wrapper">
    <NPopover placement="bottom" trigger="click" :width="300">
      <template #trigger>
        <NBadge
          :value="badgeValue"
          class="badge-action-item"
        >
          <SvgIcon name="message" size="22"></SvgIcon>
        </NBadge>
      </template>
      <PopoverMessage @clear="badgeValue = 0" />
    </NPopover>
    <SvgIcon
      name="reset"
      @click="onRefrehRoute"
      class="action-item"
      size="20"
    ></SvgIcon>
    <SvgIcon
      name="full"
      @click="onScreenFull"
      class="action-item"
      size="20"
    ></SvgIcon>
    <YSwitch class="action-item" v-model="switchTheme">
      <template #checked-icon>
        <SvgIcon name="dark"></SvgIcon>
      </template>
      <template #unchecked-icon>
        <SvgIcon name="light"></SvgIcon>
      </template>
    </YSwitch>
  </div>
</template>

<style lang="scss" scoped>
.action-items-wrapper {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 1;
  .action-item {
    display: flex;
    align-items: center;
    margin-right: 16px;
    &:hover {
      cursor: pointer;
      color: #409eff;
    }
  }
  .badge-action-item {
    cursor: pointer;
    margin-right: 30px;
  }
}
</style>
<style lang="scss" scoped>
:deep(.n-input .n-input__border, .n-input .n-input__state-border) {
  border: none;
  border-bottom: 1px solid currentColor;
}
:deep(.el-input__inner) {
  border: none !important;
  height: 35px;
  line-height: 35px;
  color: currentColor !important;
  background-color: transparent !important;
}
</style>
