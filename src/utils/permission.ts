import { h } from "vue";
import SvgIcon from "@/components/SvgIcon.vue";
import AppLink from "@/components/AppLink.vue";
import { MenuOption } from "naive-ui";
import { IMenu } from "@/model/common.ts";
import { LAYOUT } from "@/store/key.ts";

const modules = import.meta.glob("../pages/*/index.vue");
// 字符权限校验
export const checkPermi = (value: string[]): boolean => {
  if (value && value instanceof Array && value.length > 0) {
    const permissions = ["system:user:add"];
    const permissionDatas = value;
    const all_permission = "*:*:*";

    const hasPermission = permissions.some(
      (permission) =>
        all_permission === permission || permissionDatas.includes(permission)
    );

    return hasPermission;
  } else {
    console.error(
      `need roles! Like checkPermi="['system:user:add','system:user:edit']"`
    );
    return false;
  }
};

// 角色权限校验
export const checkRole = (value: string[]): boolean => {
  if (value && value instanceof Array && value.length > 0) {
    const roles = ["admin", "editor"];
    const permissionRoles = value;
    const super_admin = "admin";

    const hasRole = roles.some(
      (role) => super_admin === role || permissionRoles.includes(role)
    );

    return hasRole;
  } else {
    console.error(`need roles! Like checkRole="['admin','editor']"`);
    return false;
  }
};


// 生成 icon Dom
export const renderIcon =
  (name: string): Function =>
  () =>
    h(SvgIcon, ({ name, size: "16" } as any), undefined);

// 生成 单个menu
export const getMenuItem = (item: IMenu) => {
  let label: any;
  let key: any = item.path;
  let icon: any = "";

  label =
    item.menuType == "C"
      ? () => h(AppLink, { to: item.path }, { default: () => item.menuName })
      : item.menuName;

  icon = item.icon ? renderIcon(item.icon) : renderIcon("menu");

  let baseItem = {
    label,
    key,
    icon,
    name: item.menuName,
  };

  !icon && delete baseItem.icon;

  return baseItem;
};

// 生成 单个路由
export const getRouterItem = (item: IMenu) => {
  const { path, component } = item;
  return {
    path,
    name: path.split("/").splice(-1)[0],
    component: modules[`../pages/${component}`],
    meta: {
      title: item.menuName,
    },
  };
};

// 生成 路由组件
export const getAayncRouter = (
  routers: IMenu[],
  isP = false
): any[] => {
  let arr: any[] = [];
  routers.forEach((item) => {
    if (!item.status) {
      return;
    }

    if (item.menuType == "C") {
      arr.push(getRouterItem(item));
    } else if (item.menuType == "M") {
      const layout = {
        path: item.path,
        component: !isP ? LAYOUT : "",
        children: getAayncRouter(item.children as IMenu[], true),
        meta: {
          title: item.menuName,
        },
      };
      arr.push(layout);
    }
  });

  return arr;
};

// 生成 naive-ui 侧边栏导航
export const getSiderMenu = (routers: IMenu[]): MenuOption[] => {
  let arr: any[] = [];
  routers.forEach((item) => {
    if (item.status && item.menuType != "F") {
      const baseItem = getMenuItem(item);

      if (
        item.children &&
        item.children.filter((c: IMenu) => c.menuType !== "F").length > 0
      ) {
        arr.push({
          ...baseItem,
          children: getSiderMenu(
            item.children.filter((c: IMenu) => c.menuType !== "F")
          ),
        });
      } else {
        arr.push(baseItem);
      }
    }
  });
  return arr;
};
