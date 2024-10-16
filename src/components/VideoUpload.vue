<script setup lang="ts">
import { ref, computed } from "vue";
import type { UploadFileInfo } from "naive-ui";
import { toBase64, uploadFileChunk } from "@/utils/index.ts";

const props = defineProps({
  max: {
    type: Number,
    default: 1,
  },
});

let editIndex: any = ref(null);
let fileList: any = ref([]);
let showAdd = computed(() => {
  return props.max > fileList.value.length;
});
let images = computed(() => {
  return fileList.value.map((item: any, index: Number) => {
    return {
      src: item.base64,
      index,
    };
  });
});
const beforeUpload = (data: any) => {
  let isExist = fileList.value.some((item: any) => item.name == data.file.name);
  if (isExist) {
    editIndex.value = null;
    (window as any).$msg.error(`'${data.file.name}' 图片已经存在`);
    return false;
  }
};
const handleUploadChange = async (data: {
  fileList: UploadFileInfo[];
  file: any;
}) => {
  console.log("file", data);
  uploadFileChunk(data.file.file);
  let img64 = await toBase64(data.file.file);
  let obj = {
    ...data.file,
    base64: img64,
  };
  if (editIndex.value == null) {
    fileList.value.push(obj);
  } else {
    fileList.value.splice(editIndex.value, 1, obj);
    editIndex.value = null;
  }
};

const handleDelete = (index: Number) => {
  fileList.value.splice(index, 1);
};
</script>

<template>
  <div class="imgupload">
    <NUpload
      accept="video/*"
      v-bind="$attrs"
      abstract
      @before-upload="beforeUpload"
      @change="handleUploadChange"
    >
      <n-upload-trigger #="{ handleClick }" abstract>
        <div class="item--img" v-for="(item, index) in images">
          <video :src="item.src" controls />
          <div class="item--model">
            <SvgIcon
              class="u__cursor"
              name="delete"
              @click="handleDelete(index)"
              size="12"
            ></SvgIcon>
          </div>
        </div>
        <div
          v-show="showAdd"
          class="item--add u__flex-c u__cursor"
          @click="handleClick"
        >
          +
        </div>
      </n-upload-trigger>
    </NUpload>
  </div>
</template>

<style lang="scss" scoped>
.imgupload {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .item--img {
    position: relative;
    margin: 0 10px 10px 0;
    border: 1px solid #ccc;
    width: 200px;
    // height: 200px;
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .item--model {
      display: none;
      position: absolute;
      right: -25px;
      top: -25px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: rgba($color: #fff, $alpha: 0.8);
      padding-top: 27px;
      padding-left: 10px;
      box-sizing: border-box;
    }
    &:hover {
      .item--model {
        display: flex;
      }
    }
  }
  .item--add {
    margin-bottom: 10px;
    width: 80px;
    height: 80px;
    border: 1px solid #ccc;
    font-size: 24px;
    color: #ccc;
  }
}
</style>
