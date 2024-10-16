<script setup lang="ts">
import { reactive, h, ref } from "vue";
import { DataTableColumn } from "naive-ui";
import { getRoleTable, changeStatus, delRole } from "@/api/role-mock.ts";
import {
  useTable,
  useTableColumn,
  useRenderAction,
  TableActionModel,
  useRowKey,
} from "@/hooks/table.ts";
import YSwitch from "@/components/naive-ui/YSwitch.vue";

const props = defineProps({
  params: {
    type: Object,
    required: true,
  },
});
const emits = defineEmits(["edit", "delarr"]);

const table = useTable();
const rowKey = useRowKey("roleId");
const columns = useTableColumn(
  [
    table.selectionColumn,
    {
      title: "角色编号",
      key: "roleId",
      width: 80,
    },
    {
      title: "角色名称",
      key: "roleName",
      minWidth: 200,
    },
    {
      title: "权限字符",
      key: "roleKey",
      width: 120,
    },
    {
      title: "显示顺序",
      key: "roleSort",
      width: 120,
    },
    {
      title: "状态",
      key: "status",
      width: 80,
      render(row) {
        return h(YSwitch, {
          defaultValue: row.status,
          checkedValue: 1,
          uncheckedValue: 0,
          onUpdateValue: (value: number) => {
            changeStatus({ id: row.id, status: value }).then((res: any) => {
              window.$msg.success(res.data);
            });
          },
        } as any);
      },
    },
    {
      title: "创建时间",
      key: "createTime",
      minWidth: 200,
    },
    {
      title: "操作",
      key: "action",
      fixed: "right",
      width: 160,
      render(row: any) {
        return useRenderAction([
          {
            label: "修改",
            icon: "edit",
            onClick: onEditItem.bind(null, row),
          },
          {
            label: "删除",
            icon: "delete",
            onClick: onDeleteItem.bind(null, row),
          },
          {
            label: "数据权限",
            icon: "resetpassword",
            onClick: onDeleteItem.bind(null, row),
          },
          {
            label: "分配用户",
            icon: "assignrole",
            onClick: onDeleteItem.bind(null, row),
          },
        ] as TableActionModel[]) as any;
      },
    },
  ],
  {
    align: "center",
  } as DataTableColumn
);
const onEditItem = (item: any) => {
  emits("edit", item);
};
const onDeleteItem = (item: any) => {
  window.$dialog.warning({
    title: "警告",
    content: `确定删除 '${item.roleName}' ?`,
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: () => {
      delRole(item.id).then(() => {
        window.$msg.success("删除成功");
        getTable();
      });
    },
  });
};

let loading = ref(false);
let tableData = reactive([]);
const getTable = () => {
  loading.value = true;
  return new Promise((resolve) => {
    getRoleTable(props.params).then((data: any) => {
      loading.value = false;
      tableData = data.data.data;
      resolve(data.data.total);
    });
  });
};

const checkedRowKeys = [] as Array<any>;
const onRowCheck = (rowKeys: Array<any>) => {
  checkedRowKeys.length = 0;
  checkedRowKeys.push(...rowKeys);
};
const delArr = () => {
  if (!checkedRowKeys.length) return window.$msg.info("请选择删除项");

  window.$dialog.warning({
    title: "警告",
    content: `确定批量删除?`,
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: () => {
      delRole(checkedRowKeys).then(() => {
        window.$msg.success("删除成功");
        getTable();
      });
    },
  });
};

defineExpose({
  getTable,
  delArr,
});
</script>

<template>
  <YTable
    :loading="loading"
    :columns="columns"
    :data="tableData"
    :row-key="rowKey"
    @update:checked-row-keys="onRowCheck"
  ></YTable>
</template>

<style lang="scss" scoped></style>
