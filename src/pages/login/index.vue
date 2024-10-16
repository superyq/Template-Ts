<script setup lang="ts">
import CopeRight from "@/components/CopyRight.vue";
import LoginForm from "./LoginForm.vue";
</script>

<template>
  <div class="login-bg u__flex-c">
    <div class="login__box">
      <div class="login-logo__box">
        <div class="login__title login-logo">登 录</div>
      </div>
      <LoginForm />
    </div>
    <CopeRight />
  </div>
</template>

<style lang="scss">
.login__box .n-form-item {
  margin-top: -20px;
}
</style>

<style lang="scss" scoped>
.login-bg {
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/imgs/login_bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
}
.login__box {
  width: 425px;
  padding: 20px 40px;
  border-radius: 10px;
  background: rgba(2, 57, 104, 0.7);
  box-shadow: 0 0 30px rgba(2, 57, 104, 0.7);
  box-sizing: border-box;
  .login__title {
    font-size: 20px;
    text-align: center;
    color: #fff;
  }
}
.login-title {
  margin-bottom: 15px;
  text-align: center;
  letter-spacing: 10px;
  font-size: 18px;
  color: #fff;
  opacity: 1;
}
.login-logo__box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.login-logo {
  width: 55%;

  img {
    width: 100%;
    object-fit: cover;
  }
}
</style>
