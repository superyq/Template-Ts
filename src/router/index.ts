import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { baseRouter } from "./baseRouter.ts";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
const routes: RouteRecordRaw[] = baseRouter;

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior() {
    return { el: "#app", top: 0, behavior: "smooth" };
  },
});

router.beforeEach(async () => {
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
