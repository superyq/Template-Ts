<script setup lang="ts">
const iconsPath = import.meta.glob("@/assets/svg/*.svg");
const icons = Object.keys(iconsPath).map((item) =>
  item.replace(/\/src\/assets\/svg\//, "").replace(/\.svg/, "")
);
</script>

<template>
  <div class="page-icon">
    <div v-for="(icon, index) in icons" :key="index">
      <SvgIcon :name="icon" size="35"></SvgIcon>
      <span>{{ icon }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-icon {
  display: flex;
  flex-wrap: wrap;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    border: 1px solid #ccc;
    margin-left: -1px;
    margin-top: -1px;
    span {
      margin-top: 5px;
    }
  }
}
</style>
