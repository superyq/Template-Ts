<script setup lang="ts">
import { ref, reactive } from "vue";
import { setCookie, removeCookie, getCookie } from "@/utils/cookie.ts";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user.ts";
import { encrypt, decrypt } from "@/utils/jsencrypt.ts";
import { getCodeImg } from "@/api/login-mock.ts";

const userStore = useUserStore();
const router = useRouter();

// 登录
let loginFormRef = ref();
let rememberMe = ref(false);
let loginBtnState = ref(false);
const form = reactive({
  username: "",
  password: "",
  code: "",
  uuid: "",
});
const rules = {
  username: {
    required: true,
    trigger: ["blur"],
    message: "请输入用户名",
  },
  password: {
    required: true,
    trigger: ["blur"],
    message: "请输入密码",
  },
  code: {
    required: true,
    trigger: ["blur"],
    message: "请输入验证码",
  },
};
const handleLogin = () => {
  loginBtnState.value = true;
  loginFormRef.value?.validate((err: boolean) => {
    if (!err) {
      if (rememberMe.value) {
        setCookie("username", form.username);
        setCookie("password", encrypt(form.password));
        setCookie("rememberMe", rememberMe.value);
      } else {
        removeCookie("username");
        removeCookie("password");
        removeCookie("rememberMe");
      }

      userStore
        .login(form)
        .then(() => {
          window.$msg.success("登录成功");
          router.push("/home");
        })
        .catch(() => {
          needCode.value && getCode();
          loginBtnState.value = false;
        });
    } else {
      loginBtnState.value = false;
    }
  });
};

// 获取默认登录账号
const getDefault = () => {
  form.username = getCookie("username") || "admin";
  form.password = decrypt(getCookie("password")) || "admin123";
  rememberMe.value = Boolean(getCookie("rememberMe")) || false;
};
getDefault();

// 是否需要验证码
let needCode = ref(false);
let codeUrl = ref("");
// 获取图形验证码
const getCode = () => {
  getCodeImg().then((res) => {
    needCode.value =
      res.data.captchaEnabled === undefined ? true : res.data.captchaEnabled;
    if (needCode.value) {
      codeUrl.value = "data:image/gif;base64," + res.data.img;
      form.uuid = res.data.uuid;
    }
  });
};
</script>

<template>
  <NForm ref="loginFormRef" :model="form" :rules="rules" label-placement="left">
    <NFormItem path="username">
      <YInput
        class="u__mt-20"
        v-model="form.username"
        width="auto"
        placeholder="请输入用户名/手机号"
      >
        <template #prefix>
          <svg-icon name="username" color="grey"></svg-icon>
        </template>
      </YInput>
    </NFormItem>
    <NFormItem path="password">
      <YInput
        class="u__mt-20"
        v-model="form.password"
        width="auto"
        placeholder="请输入密码"
        type="password"
        show-password-on="mousedown"
        @keyup.enter="handleLogin"
      >
        <template #prefix>
          <svg-icon name="password" color="grey"></svg-icon>
        </template>
      </YInput>
    </NFormItem>
    <NFormItem v-if="needCode" class="login-code" path="code">
      <YInput
        v-model:value="form.code"
        class="u__mt-20 login-input_code"
        placeholder="验证码"
        @keyup.enter="handleLogin"
      >
        <template #prefix>
          <svg-icon name="code" color="grey"></svg-icon>
        </template>
      </YInput>
      <img class="login-code-img" :src="codeUrl" @click="getCode" />
    </NFormItem>
    <div class="login-checkbox_box">
      <YCheck class="u__mr-5" v-model="rememberMe"></YCheck>
      <span>记住密码</span>
    </div>
    <YButton
      class="login-btn_login"
      type="info"
      @click="handleLogin"
      :loading="loginBtnState"
      :disabled="loginBtnState"
      >登录</YButton
    >
  </NForm>
</template>

<style lang="scss" scope>
.login-code {
  .login-input_code {
    width: 240px;
  }

  .login-btn_code {
    color: #fff;
    margin-left: 20px;
  }
}

.login-btn_login {
  height: 30px;
  width: 100%;
}

.login-checkbox_box {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: -16px 0 10px;
  color: #71a1c5;
  font-size: 12px;
}

.login-checkbox {
  margin-right: 5px;
}

.login-btn_forget {
  margin-top: 10px;
  text-align: center;
  font-size: 12px;
  color: #71a1c5;
  cursor: pointer;
}

.login-code-img {
  margin-top: 20px;
  width: 30%;
  height: 35px;
  margin-left: 20px;
  object-fit: contain;
  cursor: pointer;
}
</style>
