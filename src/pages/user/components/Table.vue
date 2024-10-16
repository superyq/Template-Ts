<script setup lang="ts">
import { reactive, h, ref, computed } from "vue";
import { DataTableColumn, NFormItem } from "naive-ui";
import {
  getUserTable,
  changeStatus,
  delUser,
  resetPwd,
} from "@/api/user-mock.ts";
import { useDictStore } from "@/store/dict.ts";
import {
  useTable,
  useTableColumn,
  useRenderAction,
  TableActionModel,
  useRowKey,
} from "@/hooks/table.ts";
import YSwitch from "@/components/naive-ui/YSwitch.vue";
import YInput from "@/components/naive-ui/YInput.vue";
import YButton from "@/components/naive-ui/YButton.vue";

const props = defineProps({
  params: {
    type: Object,
    required: true,
  },
});
const emits = defineEmits(["edit", "delarr", "resetpassword", "sharerole"]);

const dictStore = useDictStore();
const dictGenderName = computed(() => {
  return dictStore.getDictType("sys_user_sex", "name");
});

const table = useTable();
const rowKey = useRowKey("id");
const columns = useTableColumn(
  [
    table.selectionColumn,
    table.indexColumn,
    {
      title: "姓名",
      key: "userName",
      minWidth: 200,
    },
    {
      title: "手机号",
      key: "phone",
      minWidth: 200,
    },
    {
      title: "最后登录IP",
      key: "lastLoginIp",
      width: 120,
    },
    {
      title: "性别",
      key: "gender",
      width: 80,
      render(row: any) {
        return h("div", null, dictGenderName.value?.[row.gender]);
      },
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
            label: "重置密码",
            icon: "resetpassword",
            onClick: onResetPassword.bind(null, row),
          },
          {
            label: "分配角色",
            icon: "assignrole",
            onClick: onShareRole.bind(null, row),
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
    content: `确定删除 '${item.userName}' ?`,
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: () => {
      delUser(item.id).then(() => {
        window.$msg.success("删除成功");
        getTable();
      });
    },
  });
};

let newPassword = ref("");
let resetPwdRef = ref(null);
const submitPassword = (id: any) => {
  if (newPassword.value.length >= 5 && newPassword.value.length <= 20) {
    resetPwd({ id, password: newPassword.value }).then((res: any) => {
      window.$msg.success(res.data);
      (resetPwdRef.value as any).destroy();
    });
  }
};
const onResetPassword = (item: any) => {
  newPassword.value = "";
  resetPwdRef.value = window.$dialog.warning({
    title: "重置密码",
    content: () =>
      h("div", null, [
        h("div", null, { default: () => `请输入 '${item.userName}' 新密码` }),
        h(
          NFormItem,
          {
            rule: {
              trigger: ["input", "blur"],
              validator() {
                if (
                  newPassword.value.length < 5 ||
                  newPassword.value.length > 20
                ) {
                  return new Error("用户密码长度必须介于 5 和 20 之间");
                }
              },
            },
            style: {
              margin: "-20px 0",
            },
          },
          {
            default: () =>
              h(YInput, {
                modelValue: newPassword.value,
                "onUpdate:modelValue": (v) => (newPassword.value = v),
              }),
          }
        ),
      ]),
    action: () =>
      h(
        YButton,
        {
          onClick: () => submitPassword(item.id),
          disabled: !newPassword.value,
        },
        { default: () => "确定" }
      ),
  });
};
const onShareRole = (item: any) => {
  emits("sharerole", item);
};

let loading = ref(false);
let tableData = reactive([]);
const getTable = () => {
  loading.value = true;
  return new Promise((resolve) => {
    getUserTable(props.params).then((data: any) => {
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
      delUser(checkedRowKeys).then(() => {
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
