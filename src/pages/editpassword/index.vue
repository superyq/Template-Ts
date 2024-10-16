<script setup lang="ts">
import { ref, reactive } from "vue";
import { updateUserPwd } from "@/api/user-mock.ts";
import { useUserStore } from "@/store/user.ts";
import { useRouter } from "vue-router";

const router = useRouter();
let userStore = useUserStore();
// 确认登出
function submitLogout() {
  userStore.logout().then(() => {
    router.push("/login");
  });
}

// 密码修改
let formRef = ref(null);
let formValue = reactive({
  oldPassword: "",
  newPassword: "",
  submitPassword: "",
});
function validatePasswordSome(rule: any, value: any) {
  false && console.log(rule);
  return formValue.newPassword === value;
}
let validatePassword = () => {};
let rules: any = {
  oldPassword: {
    required: true,
    message: "请输入原密码",
    trigger: "blur",
  },
  newPassword: [
    {
      required: true,
      message: "请输入新密码",
      trigger: ["blur", "input"],
    },
    {
      min: 5,
      max: 20,
      message: "长度在 5 到 20 个字符",
      trigger: "blur",
    },
  ],
  submitPassword: [
    {
      validator: validatePassword,
      message: "请输入旧密码",
      trigger: ["blur", "input"],
    },
    {
      validator: validatePasswordSome,
      message: "两次密码不一致",
      trigger: ["blur"],
    },
  ],
};
// 提交密码
function handleSubmit(e: any) {
  e.preventDefault();
  (formRef.value as any).validate((err: any) => {
    if (!err) {
      updateUserPwd({
        oldPassword: formValue.oldPassword,
        newPassword: formValue.newPassword,
      }).then((data: any) => {
        if (data.code !== 200) {
          return;
        }
        window.$msg.success("修改成功！");
        submitLogout();
      });
    }
  });
}
// 取消提交
function handleCancel() {
  router.push({ name: "home" });
}
</script>

<template>
  <div class="c-contain">
    <div class="password-box">
      <div class="password-box_header">修改密码</div>
      <div class="password-box_content">
        <NForm
          ref="formRef"
          :label-width="100"
          :model="formValue"
          :rules="rules"
          label-placement="left"
          size="medium"
        >
          <NFormItem path="oldPassword">
            <YInput
              v-model="formValue.oldPassword"
              placeholder="旧密码"
              show-password-on="mousedown"
              type="password"
              show-count
            ></YInput>
          </NFormItem>
          <NFormItem path="newPassword">
            <YInput
              v-model="formValue.newPassword"
              placeholder="新密码"
              type="password"
              maxlength="20"
              show-password-on="mousedown"
              show-count
            ></YInput>
          </NFormItem>
          <NFormItem path="submitPassword">
            <YInput
              ref="rPasswordFormItemRef"
              v-model="formValue.submitPassword"
              placeholder="确认新密码"
              show-password-on="mousedown"
              maxlength="20"
              show-count
              type="password"
            ></YInput>
          </NFormItem>
        </NForm>
      </div>
      <div class="password-box_footer">
        <YButton class="password-box_footer-btn" @click="handleCancel"
          >取消</YButton
        >
        <YButton
          class="password-box_footer-btn"
          type="info"
          @click="handleSubmit"
          >提交</YButton
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$width: 400px;

.password-box {
  width: 100%;
  padding-bottom: 20px;
  border: 1px solid #e9e9e9;
  border-radius: 5px;

  .password-box_header {
    font-size: 16px;
    font-weight: bolder;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    color: #000;
    background-color: #cee6f0;
  }

  .password-box_content {
    padding-top: 40px;
    margin: 0 auto;
    display: block;
    width: $width;
  }

  .password-box_footer {
    display: flex;
    justify-content: space-between;
    width: $width;
    margin: 0 auto;
    .password-box_footer-btn {
      width: 47%;
    }
  }
}
</style>
