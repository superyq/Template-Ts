<script setup lang="ts">
import { reactive, ref, onMounted, computed, provide } from "vue";
import { uiPagePages } from "@/components/naive-ui/config.ts";
import { download } from "@/utils/request.ts";
import { uploadUser } from "@/api/upload.ts";

import Search from "@/pages/user/components/Search.vue";
import Table from "@/pages/user/components/Table.vue";
import Form from "@/pages/user/components/Form.vue";

let search = reactive({
  userName: "",
  phone: "",
  status: null,
});
let searchRef = ref(null);
let pages = reactive(uiPagePages);
let params = computed(() => {
  return Object.assign({}, search, pages);
});

const table = ref(null);
const getTable = (page: number = 1) => {
  pages.page = page;

  (table.value as any).getTable().then((total: number) => {
    pages.total = total;
  });
};
const handleReset = () => {
  search.userName = "";
  search.phone = "";
  search.status = null;
  (searchRef.value as any).resetSearch();

  (search as any).params && delete (search as any).params;
  pages.page = 1;
  pages.pageSize = 20;
  getTable();
};

let title = ref("");
let btnLoading = ref(false);
let show = ref(false);
let form = ref(null);
let formId: any = ref("");
const handleShow = (row: any = null) => {
  const isEdit = !!row;
  formId.value = isEdit ? row.id : "";
  title.value = `${isEdit ? "编辑" : "新增"}用户`;
  show.value = true;
};
const handleSubmit = () => {
  btnLoading.value = true;
  (form.value as any)
    .validateForm()
    .then(() => {
      show.value = false;
    })
    .catch(() => {})
    .finally(() => {
      btnLoading.value = false;
    });
};
const handleDel = () => {
  (table.value as any).delArr();
};

let uploadShow = ref(false);
let uploadObj = ref({
  max: 1,
  accept: ".xls, .xlsx",
});
const handleExport = () => {
  download(
    "system/user/export",
    {
      ...params,
    },
    `user_${new Date().getTime()}.xlsx`
  );
};
const importTemplate = () => {
  download(
    "system/user/importTemplate",
    {},
    `user_template_${new Date().getTime()}.xlsx`
  );
};
const handleUpload = (fileList: any) => {
  console.log("fileList", fileList);
  uploadShow.value = false;
  uploadUser(fileList[0]).then((data: any) => {
    console.log("success", data);
  });
};

provide("btnload", btnLoading);
onMounted(() => {
  getTable();
});
</script>

<template>
  <View
    :upload="uploadObj"
    :title="title"
    uploadTitle="导入用户列表"
    v-model="pages"
    v-model:show="show"
    v-model:uploadShow="uploadShow"
    @add="handleShow"
    @search="getTable"
    @reset="handleReset"
    @del="handleDel"
    @submit="handleSubmit"
    @export="handleExport"
    @uploadFile="handleUpload"
  >
    <template #search>
      <Search ref="searchRef" v-model="search" @search="getTable" />
    </template>
    <template #table>
      <Table ref="table" :params="params" @edit="handleShow" />
    </template>
    <template #form>
      <Form ref="form" :formId="formId" />
    </template>
    <template #uploadTip>
      <p class="u__tc u__fz-12">
        仅允许导入xls、xlsx格式文件。
        <NButton text tag="a" @click="importTemplate">下载模板</NButton>
      </p>
    </template>
  </View>
</template>

<style lang="scss" scoped></style>
