<script setup lang="ts">
import { ref, provide } from "vue";
import UploadFile from "@/components/UploadFile.vue";

let btnLoading = ref(false);
let uploadObj = ref({
  max: 1,
  accept: ".xls, .xlsx",
});
let uploadTitle = ref("标题");
let show = ref(false);
const handleUploadFile = (fileList: any) => {
  console.log(fileList);
};

const handleClick = () => {
  show.value = true;
};
provide("btnload", btnLoading);
</script>

<template>
  <div class="index">
    <YButton @click="handleClick">上传文件</YButton>
    <UploadFile
      v-bind="uploadObj"
      :title="uploadTitle"
      v-model:show="show"
      @submit="handleUploadFile"
    />
  </div>
</template>

<style lang="scss" scoped></style>
