<script setup lang="ts">
import { ref, watchEffect, computed } from "vue";
import { useRoute } from "vue-router";
import { usePermissionStore } from "@/store/permission.ts";

defineProps({
  isOpen: Boolean,
  inverted: Boolean,
});

const route = useRoute();
const permissionStore = usePermissionStore();

const menuOptions = computed(() => {
  return permissionStore.siderMenu;
});

let activeMenuValue = ref();
watchEffect(() => {
  activeMenuValue.value = route.path;
  permissionStore.activeMenuValue = route.path;
});

const handleUpdateMenu = (value: string) => {
  activeMenuValue.value = value;
};
</script>

<template>
  <!-- logo -->
  <div
    class="layout-sider__logo u__flex-c"
    :class="{ isHide: !isOpen }"
    @click="$router.push('/home')"
  >
    <SvgIcon name="vite"></SvgIcon>
    <!-- <img src="@/assets/images/logo.png" /> -->
    <h1 v-show="isOpen">后台管理系统</h1>
  </div>
  <!-- menu组件 -->
  <NMenu
    :inverted="inverted"
    :indent="10"
    :root-indent="10"
    :options="menuOptions"
    :value="activeMenuValue"
    @update:value="handleUpdateMenu"
  />
</template>

<style lang="scss" scoped>
.layout-sider__logo {
  height: 50px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  img {
    margin-right: 5px;
    width: 25px;
    object-fit: contain;
  }
  svg {
    margin-right: 5px;
  }
}
.isHide {
  img {
    width: 30px;
  }
}
</style>
