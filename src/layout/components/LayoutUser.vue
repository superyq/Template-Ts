<script setup lang="ts">
import { reactive, h, computed } from "vue";
import { useUserStore } from "@/store/user.ts";
import { useRouter } from "vue-router";
import YButton from "@/components/naive-ui/YButton.vue";

const router = useRouter();
const userStore = useUserStore();

// 获取 用户信息
let avatar = computed(() => {
  if (!!userStore.user) {
    return userStore.user.avatar;
  } else {
    return "";
  }
});
let userName = computed(() => {
  if (!!userStore.user) {
    return userStore.user.userName;
  } else {
    return "";
  }
});

// 下拉选项
let baseOptions = reactive([
  {
    label: "个人信息",
    key: "userinfo",
  },
  {
    label: "修改密码",
    key: "editpassword",
  },
  {
    label: "退出系统",
    key: "logout",
  },
]);

// 确认登出
const submitLogout = () => {
  userStore.logout().then(() => {
    router.push("/home");
    window.$dialog.destroyAll();
    window.location.reload();
  });
};
// 取消登出
let cancelLogOut = () => {
  window.$dialog.destroyAll();
};
let handleSelect = (key: string) => {
  if (["userinfo", "editpassword"].includes(key)) {
    router.push(`/userInfo/${key}`);
  } else {
    window.$dialog.warning({
      closable: false,
      showIcon: false,
      style: {
        width: "20%",
      },
      title: () => {
        return h(
          "div",
          {
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              textAlign: "center",
              height: "40px",
              lineHeight: "40px",
              background: "#cee6f0",
              color: "#1d69a3",
              fontWeight: "bold",
              fontSize: "16px",
            },
          },
          "退出登录"
        );
      },
      content: () => {
        return h(
          "p",
          {
            style: {
              textAlign: "center",
              height: "80px",
              lineHeight: "108px",
              color: "#000",
              fontSize: "14px",
              fontWeight: "bolder",
              userSelect: "none",
            },
          },
          "是否退出当前账号？"
        );
      },
      action: () => {
        return h(
          "div",
          {
            style: {
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
            },
          },
          [
            h(
              YButton,
              {
                onClick: cancelLogOut,
                style: {
                  width: "40%",
                },
              },
              {
                default: () => "取消",
              }
            ),
            h(
              YButton,
              {
                onClick: submitLogout,
                type: "info",
                style: {
                  width: "40%",
                },
              },
              {
                default: () => "退出",
              }
            ),
          ]
        );
      },
    });
  }
};
</script>

<template>
  <NDropdown
    trigger="click"
    :options="baseOptions"
    @select="handleSelect"
    size="small"
  >
    <div class="header-right_user-box">
      <div class="header-right_user-avatar">
        <img v-if="avatar" class="header-right_avatar" :src="avatar" />
        <SvgIcon v-else name="avatar" size="35" />
      </div>
      <div class="header-right_user-name">
        <span>{{ userName }}</span>
        <SvgIcon name="down" width="10" />
      </div>
    </div>
  </NDropdown>
</template>

<style lang="scss" scoped>
.header-right_user-box {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}
.header-right_user-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
.header-right_user-name {
  font-size: 14px;
  span {
    margin: 0 5px;
  }
}
</style>
