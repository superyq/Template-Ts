<script setup lang="ts">
import { computed, useSlots } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: {},
  },
  show: {
    type: Boolean,
    default: false,
  },
  uploadShow: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "标题",
  },
  upload: {
    type: Object,
    defualt: {},
  },
  uploadTitle: {
    type: String,
    default: "标题",
  },
  controlShow: {
    type: Object,
    default: {
      del: true,
      import: true,
      export: true,
    },
  },
});

const slots = useSlots();

const emits = defineEmits([
  "add",
  "del",
  "export",
  "import",
  "search",
  "reset",
  "submit",
  "uploadFile",
  "update:modelValue",
  "update:show",
  "update:uploadShow",
]);
const delHandle = () => {
  emits("del");
};
const exportHandle = () => {
  emits("export");
};
// const importHandle = () => {
//   emits("import");
// };
const searchHandle = (page: number) => {
  emits("search", page);
};
const resetHandle = () => {
  emits("reset");
};
const submitHandle = () => {
  emits("submit");
};

const closeHandle = () => {
  emits("update:show", false);
};
const addHandle = () => {
  emits("add");
};

let pages = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});

let _uploadShow = computed({
  get() {
    return props.uploadShow;
  },
  set(value) {
    emits("update:uploadShow", value);
  },
});

const importHandle = () => {
  emits("update:uploadShow", true);
};
const handleUploadFile = (fileList: any) => {
  emits("uploadFile", fileList);
};
</script>

<template>
  <div class="g-box">
    <div class="g-search-box" v-if="slots.search">
      <slot name="search"></slot>
    </div>
    <div class="g-control-box">
      <div class="g-control__add">
        <YButton class="u__mr-10" @click="addHandle" icon="add" type="info"
          >新增</YButton
        >
        <YButton
          v-if="controlShow.del"
          class="u__mr-10"
          @click="delHandle"
          icon="delete"
          type="error"
          >删除</YButton
        >
        <YButton
          v-if="controlShow.import"
          class="u__mr-10"
          @click="importHandle"
          icon="import"
          type="info"
          >导入</YButton
        >
        <YButton
          v-if="controlShow.export"
          class="u__mr-10"
          @click="exportHandle"
          icon="export"
          type="warning"
          >导出</YButton
        >
        <slot name="control"></slot>
      </div>
      <div class="g-control__search">
        <YButton
          v-if="slots.search"
          @click="searchHandle(1)"
          icon="search"
          type="info"
          >筛选</YButton
        >
        <YButton class="u__ml-10" @click="resetHandle" icon="reset"
          >重置</YButton
        >
      </div>
    </div>
    <div class="g-table">
      <slot name="table"></slot>
    </div>
    <div class="u__mt-20" v-if="pages.hasOwnProperty('total')">
      <YPage
        v-model="pages"
        @update:page="searchHandle"
        @update:pageSize="searchHandle(1)"
      ></YPage>
    </div>
    <YModal :show="show">
      <YCard
        :title="title"
        @close="closeHandle"
        @cancel="closeHandle"
        @submit="submitHandle"
      >
        <div class="g-form__box">
          <slot name="form"></slot>
        </div>
      </YCard>
    </YModal>
    <slot name="upload"></slot>
    <UploadFile
      v-bind="upload"
      :title="uploadTitle"
      v-model:show="_uploadShow"
      @submit="handleUploadFile"
    >
      <slot name="uploadTip"> </slot>
    </UploadFile>
  </div>
</template>

<style lang="scss" scoped>
.g-search-box {
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-gap: 10px 20px;
  margin-bottom: 10px;
}
.g-control-box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
.g-page {
  margin-top: 20px;
}
.g-form__box {
  max-height: 80vh;
  overflow: auto;
}
</style>
