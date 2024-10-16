<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { deepClone } from "@/utils/index.js";
import { NFormItem } from "naive-ui";
import { menuInfo, addOrUpdateMenu } from "@/api/menu-mock.ts";
import YInput from "@/components/naive-ui/YInput.vue";
import IconSelect from "@/pages/menu/components/IconSelect.vue";

const props = defineProps({
  formId: [Number, String],
  parentId: Number,
  options: {
    type: Array,
    required: true,
  },
});

const statusOp = [
  {
    label: "启动",
    value: 1,
  },
  {
    label: "停用",
    value: 0,
  },
];
let defaultFormData = {
  parentId: 0,
  menuType: "M",
  icon: "",
  menuName: "",
  sort: 1,
  path: "",
  component: "",
  perms: "",
  status: 1,
};
let formData = ref(deepClone(defaultFormData));
const rules = {
  menuName: {
    required: true,
    trigger: ["input", "blur"],
    message: "请输入菜单名称",
  },
  sort: {
    required: true,
    message: "请输入排序",
  },
  path: {
    required: true,
    trigger: ["input", "blur"],
    message: "请输入路由地址",
  },
};
const getDetail = () => {
  menuInfo(props.formId).then((res: any) => {
    formData.value = res.data;
  });
};

let formRef = ref(null);
const resetForm = () => {
  formData.value = deepClone(defaultFormData);
};
const validateForm = () => {
  return new Promise((resolve, reject) => {
    (formRef.value as any).validate((errs: any) => {
      if (!errs) {
        addOrUpdateMenu(formData.value)
          .then(() => {
            window.$msg.success(
              `${formData.value.userId ? "修改" : "新增"}目录成功！`
            );
            resolve(true);
          })
          .catch(() => {
            reject(false);
          });
      } else {
        reject(false);
      }
    });
  });
};

const changeParentIdHandle = (newParentId: any) => {
  formData.value.parentId = newParentId;
};

const menuTypeOp = [
  {
    label: "目录",
    value: "M",
  },
  {
    label: "菜单",
    value: "C",
  },
  {
    label: "按钮",
    value: "F",
  },
];

const menuInputOp: any = {
  M: ["icon", "path", "status"],
  C: ["icon", "path", "component", "status", "perms"],
  F: ["perms"],
};
let modelArr = computed(() => {
  return menuInputOp[formData.value.menuType];
});

defineExpose({
  validateForm,
});

onMounted(() => {
  resetForm();
  props.formId && getDetail();
  props.parentId && (formData.value.parentId = props.parentId);
  console.log(1, props.parentId);
});
</script>

<template>
  <NForm
    class="u__grid-c2"
    ref="formRef"
    :model="formData"
    :rules="rules"
    label-placement="left"
    require-mark-placement="left"
    label-width="80"
  >
    <NFormItem
      path="parentId"
      label="上级菜单"
      style="grid-area: 1 / 1 / 2 / 3"
    >
      <NTreeSelect
        :value="formData.parentId"
        :options="(options as any)"
        @update:value="changeParentIdHandle"
        size="small"
      />
    </NFormItem>
    <NFormItem path="menuType" label="菜单类型">
      <YRadio v-model="formData.menuType" :options="menuTypeOp"></YRadio>
    </NFormItem>
    <NFormItem v-if="modelArr.includes('icon')" path="icon" label="菜单图标">
      <IconSelect ref="iconRef" v-model="formData.icon" />
    </NFormItem>
    <NFormItem path="menuName" label="菜单名称">
      <YInput v-model="formData.menuName"></YInput>
    </NFormItem>
    <NFormItem path="sort" label="显示排序">
      <YInput isNumber v-model="formData.sort" :min="1"></YInput>
    </NFormItem>
    <NFormItem v-if="modelArr.includes('path')" path="path" label="路由地址">
      <YInput v-model="formData.path"></YInput>
    </NFormItem>
    <NFormItem
      v-if="modelArr.includes('component')"
      path="component"
      label="组件路径"
    >
      <YInput v-model="formData.component"></YInput>
    </NFormItem>
    <NFormItem v-if="modelArr.includes('perms')" path="perms" label="权限字符">
      <YInput v-model="formData.perms"></YInput>
    </NFormItem>
    <NFormItem
      v-if="modelArr.includes('status')"
      path="status"
      label="菜单状态"
    >
      <YRadio v-model="formData.status" :options="statusOp"></YRadio>
    </NFormItem>
  </NForm>
</template>

<style lang="scss" scoped>
.btn-submit {
  margin: 0 20px 0 30px;
}
</style>
