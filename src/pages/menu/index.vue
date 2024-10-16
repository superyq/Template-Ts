<script setup lang="ts">
import { reactive, ref, onMounted, computed, provide } from "vue";

import Search from "@/pages/menu/components/Search.vue";
import Table from "@/pages/menu/components/Table.vue";
import Form from "@/pages/menu/components/Form.vue";

let parentIdOptions: any = ref(null);
const table = ref(null);
const getTable = () => {
  (table.value as any).getTable().then((data: any) => {
    parentIdOptions.value = data;
  });
};

const controlShow = reactive({
  del: false,
  export: false,
  import: false,
});

let search = reactive({
  menuName: "",
  menuState: null,
});
let params = computed(() => {
  return Object.assign({}, search);
});
const handleReset = () => {
  search.menuName = "";
  search.menuState = null;

  getTable();
};

let title = ref("");
let btnLoading = ref(false);
let show = ref(false);
let form = ref(null);
let formId: any = ref("");
const handleShow = (row: any = null) => {
  const isEdit = !!row;
  formId.value = isEdit ? row.menuId : "";
  title.value = `${isEdit ? "编辑" : "新增"}菜单`;
  show.value = true;
  parentId.value = 0;
};
const handleSubmit = () => {
  btnLoading.value = true;
  (form.value as any)
    .validateForm()
    .then(() => {
      show.value = false;
      getTable();
    })
    .catch(() => {})
    .finally(() => {
      btnLoading.value = false;
    });
};

let parentId = ref(0);
const handleAdd = (row: any) => {
  parentId.value = row.menuId;
  title.value = "新增菜单";
  show.value = true;
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
    v-model:show="show"
    @add="handleShow"
    @search="getTable"
    @reset="handleReset"
    @submit="handleSubmit"
  >
    <template #search>
      <Search ref="searchRef" v-model="search" @search="getTable" />
    </template>
    <template #table>
      <Table ref="table" :params="params" @edit="handleShow" @add="handleAdd" />
    </template>
    <template #form>
      <Form
        ref="form"
        :formId="formId"
        :parentId="parentId"
        :options="parentIdOptions"
      />
    </template>
  </View>
</template>

<style lang="scss" scoped></style>
