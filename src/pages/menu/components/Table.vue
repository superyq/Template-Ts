<script setup lang="ts">
import { reactive, h, ref } from "vue";
import { DataTableColumn } from "naive-ui";
import { getMenuTable, changeStatus, delMenu } from "@/api/menu-mock.ts";
import { toTreeData } from "@/utils/index.ts";
import {
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
const emits = defineEmits(["edit", "add"]);

const rowKey = useRowKey("menuId");
const columns = useTableColumn(
  [
    {
      title: "菜单名称",
      key: "menuName",
      width: "200",
      fixed: "left",
    },
    {
      title: "图标",
      key: "icon",
      width: "120",
    },
    {
      title: "排序",
      key: "sort",
      width: "80",
    },
    {
      title: "权限标识",
      key: "perms",
      minWidth: "200",
    },
    {
      title: "组件路径",
      key: "component",
      width: "200",
    },
    {
      title: "创建时间",
      key: "createTime",
      width: "200",
    },
    {
      title: "状态",
      key: "status",
      width: "120",
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
            label: "新增",
            icon: "add",
            onClick: onAddItem.bind(null, row),
          },
          {
            label: "删除",
            icon: "delete",
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
const onEditItem = (row: any) => {
  emits("edit", row);
};

const onAddItem = (row: any) => {
  emits("add", row);
};
const onDeleteItem = (item: any) => {
  window.$dialog.warning({
    title: "警告",
    content: `确定删除 '${item.menuName}' ?`,
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: () => {
      delMenu(item.menuId).then(() => {
        window.$msg.success("删除成功");
        getTable();
      });
    },
  });
};

const toOptions = (arr: any) => {
  let _arr: any = [];
  arr.forEach((item: any) => {
    if (item.children) {
      _arr.push({
        label: item.menuName,
        key: item.menuId,
        children: toOptions(item.children),
      });
    } else {
      _arr.push({ label: item.menuName, key: item.menuId });
    }
  });
  return _arr;
};

let loading = ref(false);
let tableData: any = reactive([]);
let parentIdOptions: any = reactive([]);
const getTable = () => {
  loading.value = true;
  return new Promise((resolve) => {
    getMenuTable(props.params).then((data: any) => {
      tableData = toTreeData(data.data, 0);
      parentIdOptions = [
        { key: 0, label: "主类目", children: toOptions(tableData) },
      ];
      loading.value = false;
      resolve(parentIdOptions);
    });
  });
};

defineExpose({
  getTable,
});
</script>

<template>
  <YTable
    :loading="loading"
    :columns="columns"
    :data="tableData"
    :row-key="rowKey"
  ></YTable>
</template>

<style lang="scss" scoped></style>
