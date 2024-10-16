<script setup lang="ts">
import ImgCutter from "@/components/ImgCutter.vue";

const getUrl = (str: any) => {
  console.log(1, str);
};
</script>

<template>
  <div class="index">
    <ImgCutter @getUrl="getUrl"/>
  </div>
</template>

<style lang="scss" scoped></style>
