import { LAYOUT } from "@/store/key.ts";

export const baseRouter = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/login/index.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/",
    component: LAYOUT,
    meta: {
      title: "首页",
      hidden: true,
    },
    children: [
      {
        path: "/demo",
        name: "demo",
        component: () => import("@/pages/demo/index.vue"),
        meta: {
          title: "demo",
        },
      },
      {
        path: "/home",
        name: "home",
        component: () => import("@/pages/home/index.vue"),
        meta: {
          title: "首页",
        },
      },
    ],
  },
  {
    path: "/userInfo",
    component: LAYOUT,
    meta: {
      title: "个人中心",
      hidden: true,
    },
    children: [
      {
        path: "userinfo",
        name: "userinfo",
        component: () => import("@/pages/userinfo/index.vue"),
        meta: {
          title: "个人信息",
        },
      },
      {
        path: "editpassword",
        name: "editpassword",
        component: () => import("@/pages/editpassword/index.vue"),
        meta: {
          title: "修改密码",
        },
      },
    ],
  },
  {
    path: "/",
    component: LAYOUT,
    meta: {
      title: "字典数据",
      hidden: true,
    },
    children: [
      {
        path: "/dicttype/:dictId(\\d+)",
        name: "dicttype",
        component: () => import("@/pages/dicttype/index.vue"),
        meta: {
          title: "字典数据",
        },
      },
    ],
  },
  // 所有未知页面都是404
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/pages/404/index.vue"),
    meta: {
      title: "404",
    },
  },
];
