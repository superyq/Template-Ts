<script setup lang="ts">
import ImgCutter from "vue-img-cutter";
import { updateAvatar } from "@/api/user-mock.ts";

let emits = defineEmits(["getUrl"]);
let cutDown = (data: any) => {
  let formData = new FormData();
  let { file } = data;
  console.log("img", data);
  formData.append("file", file);
  updateAvatar(formData).then((res) => {
    emits("getUrl", res);
  });
};
</script>

<template>
  <ImgCutter @cutDown="cutDown">
    <template #ratio> aaaa </template>
  </ImgCutter>
</template>

<style lang="scss" scoped></style>
