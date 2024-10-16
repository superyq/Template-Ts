<script setup lang="ts">
import { ref } from "vue";
import type { UploadFileInfo } from "naive-ui";

defineProps({
  show: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: "标题",
  },
});
const emits = defineEmits(["update:show", "submit"]);

const closeHandle = () => {
  fileList.value.length = 0;
  emits("update:show", false);
};
const submitHandle = () => {
  let _fileList = fileList.value.map((item: any) => item.file);
  emits("submit", _fileList);
};

const beforeUpload = (data: any) => {
  let isExist = fileList.value.some((item: any) => item.name == data.file.name);
  if (isExist) {
    (window as any).$msg.error(`'${data.file.name}' 文件已经存在`);
    return false;
  }
};
const customRequest = (data: any) => {
  console.log("request", data.file.file);
};

let fileList: any = ref([]);
const handleUploadChange = (data: { fileList: UploadFileInfo[] }) => {
  fileList.value = data.fileList;
};
const handleRemove = (data: any) => {
  console.log("remove", data, fileList);
};
const handleFileListChange = () => {
  console.log("change", fileList);
};
</script>

<template>
  <YModal :show="show">
    <YCard
      :title="title"
      @close="closeHandle"
      @cancel="closeHandle"
      @submit="submitHandle"
    >
      <NUpload
        v-bind="$attrs"
        directory-dnd
        v-model:file-list="fileList"
        :custom-request="customRequest"
        @before-upload="beforeUpload"
        @change="handleUploadChange"
        @remove="handleRemove"
        @update:file-list="handleFileListChange"
      >
        <NUploadDragger>
          <div style="margin-bottom: 12px">
            <SvgIcon name="load" size="48"></SvgIcon>
          </div>
          <p style="font-size: 16px">点击或者拖动文件到该区域来上传</p>
          <p depth="3" style="margin: 8px 0 0 0">
            请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
          </p>
        </NUploadDragger>
      </NUpload>
      <slot></slot>
    </YCard>
  </YModal>
</template>

<style lang="scss" scope></style>
