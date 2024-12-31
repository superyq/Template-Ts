export const baseRouter = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/pages/home/index.vue"),
    meta: {
      title: "首页",
    },
  },
  {
    path: "/table",
    name: "table",
    component: () => import("@/pages/table/index.vue"),
    meta: {
      title: "表单",
    },
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
