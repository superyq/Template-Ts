<script setup lang="ts">
import { ref, onMounted } from "vue";
import { deepClone } from "@/utils/index.js";
import { NFormItem } from "naive-ui";
import { getDictTypeDetail, addOrUpdateDictType } from "@/api/dict-mock.ts";
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
  dictCode: undefined,
  dictLabel: undefined,
  dictValue: undefined,
  listClass: "default",
  dictSort: 0,
  status: 0,
  remark: undefined,
};
let formData = ref(deepClone(defaultFormData));
const rules = {
  dictLabel: [{ required: true, message: "数据标签不能为空", trigger: "blur" }],
  dictValue: [{ required: true, message: "数据键值不能为空", trigger: "blur" }],
  dictSort: { required: true, message: "数据顺序不能为空" },
};
const getDetail = () => {
  getDictTypeDetail(props.formId).then((res: any) => {
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
        addOrUpdateDictType(formData.value)
          .then(() => {
            window.$msg.success(
              `${formData.value.userId ? "修改" : "新增"}字典数据成功！`
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
    <NFormItem path="dictType" label="字典类型">
      <YInput v-model="formData.dictType"></YInput>
    </NFormItem>
    <NFormItem path="dictLabel" label="数据标签">
      <YInput v-model="formData.dictLabel"></YInput>
    </NFormItem>
    <NFormItem path="dictValue" label="数据键值">
      <YInput v-model="formData.dictValue"></YInput>
    </NFormItem>
    <NFormItem path="dictSort" label="显示排序">
      <YInput isNumber v-model="formData.dictSort" :min="0"></YInput>
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
