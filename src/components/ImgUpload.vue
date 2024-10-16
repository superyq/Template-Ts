<script setup lang="ts">
import { ref, computed } from "vue";
import type { UploadFileInfo } from "naive-ui";
import { toBase64 } from "@/utils/index.ts";
import ImgView from "@/components/ImgView.vue";

const props = defineProps({
  max: {
    type: Number,
    default: 10,
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

const handleEdit = (index: Number, fn: Function) => {
  editIndex.value = index;
  fn();
};

const imgView = ref();
const handleShow = (index: any) => {
  imgView.value.showImg(index);
};
</script>

<template>
  <div class="imgupload">
    <ImgView ref="imgView" :images="images" />
    <NUpload
      accept=".png, .jpeg, .jpg"
      v-bind="$attrs"
      abstract
      @before-upload="beforeUpload"
      @change="handleUploadChange"
    >
      <n-upload-trigger #="{ handleClick }" abstract>
        <div class="item--img" v-for="(item, index) in images">
          <img :src="item.src" />
          <div class="item--model u__flex-c">
            <SvgIcon
              class="u__cursor"
              name="eye"
              @click="handleShow(index)"
            ></SvgIcon>
            <SvgIcon
              class="u__cursor"
              name="delete"
              @click="handleDelete(index)"
            ></SvgIcon>
            <SvgIcon
              class="u__cursor"
              name="edit"
              @click="handleEdit(index, handleClick)"
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
    width: 80px;
    height: 80px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .item--model {
      display: none;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba($color: #fff, $alpha: 0.8);
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
