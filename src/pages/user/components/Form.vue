<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { deepClone } from "@/utils/index.js";
import { validatePhone, validateEmail } from "@/utils/validateForm.ts";
import { NFormItem } from "naive-ui";
import { useDictStore } from "@/store/dict.ts";
import { getUserDetail, addOrUpdateUser } from "@/api/user-mock.ts";
import YSelect from "@/components/naive-ui/YSelect.vue";
import YInput from "@/components/naive-ui/YInput.vue";

const props = defineProps({
  formId: [Number, String],
});

const dictStore = useDictStore();
const dictGenderOp = computed(() => {
  return dictStore.getDictType("sys_user_sex", "op");
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
  userId: null,
  userName: "",
  realName: "",
  password: "",
  phone: "",
  email: "",
  status: 1,
  remark: "",
  deptId: "",
  postId: "",
  roleId: "",
  gender: 1,
};
let formData = ref(deepClone(defaultFormData));
const rules = {
  gender: {
    required: true,
    message: "请选择性别",
  },
  userName: {
    required: true,
    message: "请输入用户昵称",
    trigger: ["input", "blur"],
  },
  realName: {
    required: true,
    message: "请输入真实姓名",
    trigger: ["input", "blur"],
  },
  phone: {
    required: true,
    validator: validatePhone,
    trigger: ["input", "blur"],
  },
  email: {
    validator: validateEmail,
    trigger: ["input", "blur"],
  },
  status: {
    required: true,
    message: "请选择状态",
  },
};
const getDetail = () => {
  getUserDetail(props.formId).then((res: any) => {
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
        addOrUpdateUser(formData.value)
          .then(() => {
            window.$msg.success(
              `${formData.value.userId ? "修改" : "新增"}用户成功！`
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

const chanegGender = () => {
  (formRef.value as any).validate();
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
    class="u__grid-c2"
    ref="formRef"
    :model="formData"
    :rules="rules"
    label-placement="left"
    require-mark-placement="left"
    label-width="80"
  >
    <NFormItem path="userName" label="用户昵称">
      <YInput v-model="formData.userName"></YInput>
    </NFormItem>
    <NFormItem path="deptId" label="所属部门">
      <YInput v-model="formData.deptId"></YInput>
    </NFormItem>
    <NFormItem path="realName" label="真实姓名">
      <YInput v-model="formData.realName"></YInput>
    </NFormItem>
    <NFormItem path="password" label="用户密码">
      <YInput
        v-model="formData.password"
        type="password"
        show-password-on="mousedown"
      ></YInput>
    </NFormItem>
    <NFormItem path="phone" label="手机号">
      <YInput v-model="formData.phone"></YInput>
    </NFormItem>
    <NFormItem path="email" label="邮箱">
      <YInput v-model="formData.email"></YInput>
    </NFormItem>
    <NFormItem path="gender" label="性别">
      <YSelect
        v-model="formData.gender"
        :options="dictGenderOp"
        @update:value="chanegGender"
      ></YSelect>
    </NFormItem>
    <NFormItem path="status" label="状态">
      <YRadio v-model="formData.status" :options="statusOp"></YRadio>
    </NFormItem>
    <NFormItem path="post" label="岗位">
      <YInput v-model="formData.postId"></YInput>
    </NFormItem>
    <NFormItem path="role" label="角色">
      <YInput v-model="formData.roleId"></YInput>
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
