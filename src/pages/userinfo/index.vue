<script setup lang="ts">
import { computed, ref, reactive } from "vue";
import { NInput, NButton, NDivider } from "naive-ui";
import { validPhone } from "@/utils/validate.ts";
import ImgCutter from "@/components/ImgCutter.vue";
import { useUserStore } from "@/store/user.ts";
import { updateUserinfo } from "@/api/user-mock.ts";

let userStore = useUserStore();
let user = computed(() => {
  return userStore.user;
});
let editUser: any = reactive({ ...user.value });

let getUrl = (str: any) => {
  userStore.user.avatar = str.imgUrl;
};

// 编辑用户信息
let loading = ref(false);
let isEdit = ref(false);
// 验证手机号
let validatPhone = computed(() => {
  return validPhone(editUser.phoneNumber);
});
let handleEdit = () => {
  isEdit.value = true;
};
let handleSubmit = (type: any) => {
  if (type) {
    if (!validatPhone.value) {
      return window.$msg.error("请正确输入手机号");
    }
    loading.value = true;
    delete editUser._id;
    updateUserinfo(editUser).then((data: any) => {
      if (data.code != 200) {
        loading.value = false;
        return;
      }
      loading.value = false;
      isEdit.value = false;
      userStore.getInfo();
      window.$msg.success("修改成功！");
    });
  } else {
    isEdit.value = false;
  }
};
</script>

<template>
  <div class="c-contain">
    <div class="user-box">
      <div class="user-box_header">个人信息</div>
      <div class="user-box_content">
        <div class="user-box_content-item">
          <div class="item-label">头像：</div>
          <div class="item-value user-avatar-box">
            <img v-if="user.avatar" :src="user.avatar" />
            <SvgIcon v-else name="avatar" size="100"></SvgIcon>
          </div>
          <ImgCutter @getUrl="getUrl"></ImgCutter>
        </div>
        <NDivider />
        <div class="edit__info-box">
          <div class="edit__info">
            <template v-if="!isEdit">
              <div class="user-box_content-item">
                <div class="item-label">用户名：</div>
                <div class="item-value">{{ user.userName }}</div>
              </div>
              <div class="user-box_content-item">
                <div class="item-label">真实姓名：</div>
                <div class="item-value">{{ user.realName }}</div>
              </div>
              <div class="user-box_content-item">
                <div class="item-label">手机号码：</div>
                <div class="item-value">{{ user.phoneNumber }}</div>
              </div>
              <div class="user-box_content-item">
                <div class="item-label">邮箱：</div>
                <div class="item-value">{{ user.email }}</div>
              </div>
              <div class="btn__box">
                <n-button @click="handleEdit" size="small"
                  >修改个人信息</n-button
                >
              </div>
            </template>
            <template v-else>
              <div class="user-box_content-item">
                <div class="item-label">用户名：</div>
                <div class="item-value">{{ editUser.userName }}</div>
              </div>
              <div class="user-box_content-item">
                <div class="item-label">用户姓名：</div>
                <n-input
                  class="info-input--width item-value"
                  size="small"
                  v-model:value="editUser.realName"
                ></n-input>
              </div>
              <div class="user-box_content-item">
                <div class="item-label">手机号码：</div>
                <n-input
                  class="info-input--width item-value"
                  size="small"
                  v-model:value="editUser.phoneNumber"
                ></n-input>
              </div>
              <div class="user-box_content-item">
                <div class="item-label">邮箱：</div>
                <n-input
                  class="info-input--width item-value"
                  size="small"
                  v-model:value="editUser.email"
                ></n-input>
              </div>
              <div class="btn__box">
                <n-button
                  style="margin-right: 20px"
                  @click="handleSubmit(true)"
                  type="primary"
                  size="small"
                  :loading="loading"
                  >修 改</n-button
                >
                <n-button
                  @click="handleSubmit(false)"
                  size="small"
                  :disabled="loading"
                  >取 消</n-button
                >
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.btn__box {
  .n-button--info-type {
    --n-color: #409eff !important;
  }
}
</style>
<style lang="scss" scoped>
.edit__info-box {
  display: flex;
  .info-input--width {
    width: 200px;
  }
  .btn__box {
    display: flex;
    justify-content: center;
  }
  .edit__info {
    width: 50%;
  }
  .edit__limit {
    .tree-box {
      min-height: 220px;
    }
    box-sizing: border-box;
    padding-left: 40px;
    width: 50%;
  }
}
.user-box {
  border: 1px solid #e9e9e9;
  border-radius: 10px;
  overflow: hidden;
  width: 50%;
  min-width: 800px;

  .user-box_header {
    font-size: 16px;
    font-weight: bolder;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    color: #000;
    background-color: #cee6f0;
  }

  .user-box_content {
    font-size: 14px;
    padding: 20px;

    .item-label {
      text-align: right;
      width: 100px;
      font-weight: bolder;
      color: #cfcfcf;
    }

    .item-value {
      color: #4f4f4f;
    }

    .user-box_content-item {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      .user-avatar-box {
        margin-left: 0px;
        margin-right: 20px;
        width: 100px;
        height: 100px;
        overflow: hidden;
        border-radius: 50%;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>
