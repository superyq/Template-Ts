<script setup lang="ts">
import { reactive, ref, onMounted, computed, provide } from "vue";
import { uiPagePages } from "@/components/naive-ui/config.ts";
import { download } from "@/utils/request.ts";

import Search from "@/pages/role/components/Search.vue";
import Table from "@/pages/role/components/Table.vue";
import Form from "@/pages/role/components/Form.vue";

let search = reactive({
  roleName: "",
  roleKey: "",
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

const controlShow = reactive({
  del: true,
  export: true,
  import: false,
});

const handleReset = () => {
  search.roleName = "";
  search.roleKey = "";
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
  formId.value = isEdit ? row.roleId : "";
  title.value = `${isEdit ? "编辑" : "新增"}角色`;
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

const handleExport = () => {
  download(
    "system/user/export",
    {
      ...params,
    },
    `user_${new Date().getTime()}.xlsx`
  );
};

provide("btnload", btnLoading);
onMounted(() => {
  getTable();
});
</script>

<template>
  <View
    :title="title"
    :controlShow="controlShow"
    uploadTitle="导入用户列表"
    v-model="pages"
    v-model:show="show"
    @add="handleShow"
    @search="getTable"
    @reset="handleReset"
    @del="handleDel"
    @submit="handleSubmit"
    @export="handleExport"
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
  </View>
</template>

<style lang="scss" scoped></style>
