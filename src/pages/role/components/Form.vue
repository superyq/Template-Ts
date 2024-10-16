<script setup lang="ts">
import { ref, onMounted } from "vue";
import { deepClone } from "@/utils/index.js";
import { NFormItem } from "naive-ui";
import { getRoleDetail, addOrUpdateRole } from "@/api/role-mock.ts";
import YInput from "@/components/naive-ui/YInput.vue";

const props = defineProps({
  formId: [Number, String],
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
  roleId: undefined,
  roleName: undefined,
  roleKey: undefined,
  roleSort: 0,
  status: "0",
  menuIds: [],
  deptIds: [],
  menuCheckStrictly: true,
  deptCheckStrictly: true,
  remark: undefined,
};
let formData = ref(deepClone(defaultFormData));
const rules = {
  roleName: [{ required: true, message: "角色名称不能为空", trigger: "blur" }],
  roleKey: [{ required: true, message: "权限字符不能为空", trigger: "blur" }],
  roleSort: { required: true, message: "角色顺序不能为空" },
};
const getDetail = () => {
  getRoleDetail(props.formId).then((res: any) => {
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
        addOrUpdateRole(formData.value)
          .then(() => {
            window.$msg.success(
              `${formData.value.userId ? "修改" : "新增"}角色成功！`
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

defineExpose({
  validateForm,
});

onMounted(() => {
  resetForm();
  props.formId && getDetail();
});
</script>

<template>
  <NForm
    ref="formRef"
    :model="formData"
    :rules="rules"
    label-placement="left"
    require-mark-placement="left"
    label-width="80"
  >
    <NFormItem path="roleName" label="角色名称">
      <YInput v-model="formData.roleName"></YInput>
    </NFormItem>
    <NFormItem path="roleKey" label="权限字符">
      <YInput v-model="formData.roleKey"></YInput>
    </NFormItem>
    <NFormItem path="roleSort" label="角色顺序">
      <YInput isNumber :min="0" v-model="formData.roleSort"></YInput>
    </NFormItem>
    <NFormItem path="status" label="状态">
      <YRadio v-model="formData.status" :options="statusOp"></YRadio>
    </NFormItem>
    <NFormItem path="remark" label="备注" style="grid-area: 6 / 1 / 10 / 3">
      <YInput width="auto" type="textarea" v-model="formData.remark"></YInput>
    </NFormItem>
  </NForm>
</template>

<style lang="scss" scoped>
.btn-submit {
  margin: 0 20px 0 30px;
}
</style>
