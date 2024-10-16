import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { baseRouter } from "./baseRouter.ts";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from "@/utils/cookie.js";
import { useUserStore } from "@/store/user.ts";
import { usePermissionStore } from "@/store/permission.ts";

const whiteList = ["/login", "/demo"];
const routes: RouteRecordRaw[] = baseRouter;

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior() {
    return { el: "#app", top: 0, behavior: "smooth" };
  },
});

router.beforeEach(async (to) => {
  const userStore = useUserStore();
  const permissionStore = usePermissionStore();
  NProgress.start();
  if (getToken()) {
    if (to.path === "/login") {
      return { path: "/" };
    }
    if (whiteList.includes(to.path)) {
      return true;
    }

    // 获取路由和导航
    if (userStore.roles.length === 0) {
      try {
        await userStore.getInfo();
        const accessRoutes: RouteRecordRaw[] =
          (await permissionStore.getRouters()) as RouteRecordRaw[];

        accessRoutes.forEach((routerItem) => {
          router.addRoute(routerItem as RouteRecordRaw);
        });
        return { path: to.path, replace: true };
      } catch {
        userStore.logout().then((res: any) => {
          window.$msg.error(res.data);
          return { path: "/login", replace: true };
        });
      }
    } else {
      return true;
    }
  } else {
    // 白名单直接跳转
    if (whiteList.includes(to.path)) {
      return true;
    }
    return {
      path: `/login?redirect=${encodeURIComponent(to.path)}`,
      replace: true,
    };
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
