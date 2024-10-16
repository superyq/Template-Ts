import { defineStore } from "pinia";
import { getRouters } from "@/api/user-mock.ts";
import { getSiderMenu, getAayncRouter } from "@/utils/permission.ts";
import { toTreeData, deepClone } from "@/utils/index.ts";
import { IMenu } from "@/model/common.ts";
import { RouteRecordRaw } from "vue-router";

export const usePermissionStore = defineStore({
  id: "permissionStore",
  state: () => {
    return {
      siderMenu: [],
      activeMenuValue: "",
    };
  },
  actions: {
    getRouters() {
      return new Promise((resolve, reject) => {
        getRouters()
          .then(({ data }: any) => {
            this.siderMenu = getSiderMenu(
              toTreeData(deepClone(data), 0) as IMenu[]
            );

            const routerData: RouteRecordRaw[] = getAayncRouter(
              toTreeData(deepClone(data), 0) as IMenu[]
            );
            resolve(routerData);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});
