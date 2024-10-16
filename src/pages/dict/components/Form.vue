<script setup lang="ts">
import { ref, onMounted } from "vue";
import { deepClone } from "@/utils/index.js";
import { NFormItem } from "naive-ui";
import { getDictDetail, addOrUpdateDict } from "@/api/dict-mock.ts";
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
  dictId: undefined,
  dictName: undefined,
  dictType: undefined,
  status: "0",
  remark: undefined,
};
let formData = ref(deepClone(defaultFormData));
const rules = {
  dictName: [{ required: true, message: "字典名称不能为空", trigger: "blur" }],
  dictType: [{ required: true, message: "字典类型不能为空", trigger: "blur" }],
};
const getDetail = () => {
  getDictDetail(props.formId).then((res: any) => {
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
        addOrUpdateDict(formData.value)
          .then(() => {
            window.$msg.success(
              `${formData.value.userId ? "修改" : "新增"}字典成功！`
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
    <NFormItem path="dictName" label="字典名称">
      <YInput v-model="formData.dictName"></YInput>
    </NFormItem>
    <NFormItem path="dictType" label="字典类型">
      <YInput v-model="formData.dictType"></YInput>
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
