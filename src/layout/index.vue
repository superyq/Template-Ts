<script setup lang="ts">
import { ref } from "vue";
import LayoutMenu from "./components/LayoutMenu.vue"; // menu
import LayoutCrumbs from "./components/LayoutCrumbs.vue"; //
import LayoutUser from "./components/LayoutUser.vue"; //
import LayoutTag from "./components/LayoutTag.vue"; // 页面标签
import LayoutContent from "./components/LayoutContent.vue"; // 页面内容
import LayoutAction from "./components/LayoutAction.vue"; // 页面内容
import CopeRight from "@/components/CopyRight.vue";

let bordered = ref(true); // 边框显示
let inverted = ref(false); // 背景色反转
let scrollbar = ref(false); // 原生滚动条使用
let colWidth = ref(50); // 折叠宽度
let siderWidth = ref(155); // 展开宽度

let isOpen = ref(true); // menu展开
const handleChangeSider = (isHide: Boolean) => {
  if (isHide) {
    isOpen.value = !isHide;
  }
};
const handleEnter = () => {
  isOpen.value = true;
};
</script>

<template>
  <NLayout has-sider class="layout-box">
    <!-- 侧边导航 -->
    <NLayoutSider
      collapse-mode="width"
      show-trigger="arrow-circle"
      :bordered="bordered"
      :inverted="inverted"
      :native-scrollbar="scrollbar"
      :collapsed-width="colWidth"
      :width="siderWidth"
      @update:collapsed="handleChangeSider"
      @after-enter="handleEnter"
    >
      <LayoutMenu :isOpen="isOpen" :inverted="inverted"></LayoutMenu>
    </NLayoutSider>
    <NLayout>
      <NLayoutHeader :bordered="bordered">
        <div class="layout-header__box">
          <!-- 面包屑 -->
          <LayoutCrumbs />
          <div style="flex: 1"></div>
          <!-- 控制栏 -->
          <LayoutAction />
          <!-- 用户信息 -->
          <LayoutUser />
        </div>
        <LayoutTag></LayoutTag>
        <div class="layout-header__shadow"></div>
      </NLayoutHeader>
      <NLayoutContent>
        <LayoutContent></LayoutContent>
      </NLayoutContent>
      <CopeRight color="#18a058" />
    </NLayout>
  </NLayout>
</template>

<style lang="scss" scoped>
.layout-box {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
}
.layout-header__box {
  display: flex;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  height: 50px;
  border-bottom: 1px solid rgb(239, 239, 245);
}
.layout-header__shadow {
  width: 100%;
  height: 2px;
  background: #d9d9d9;
}
</style>
