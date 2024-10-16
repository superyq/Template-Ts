<script setup lang="ts">
import { watchEffect, reactive } from "vue";
import { NBreadcrumb, NBreadcrumbItem } from "naive-ui";
import { useRoute, useRouter, RouteRecordNormalized } from "vue-router";
import { isExternal } from "@/utils/validate.ts";

interface DropItem {
  label: string;
  key: string;
  children?: DropItem[];
}

const route = useRoute();
const router = useRouter();

const breadcrumbs = reactive([] as Array<DropItem>);

// 例："/system/user/info" => ["/system", "/system/user", "/system/user/info"]
const handlePath = (path: string) => {
  return path.split("/").reduce((pre: string[], cur: string) => {
    if (cur) {
      const lastItem = pre[pre.length - 1];
      if (lastItem) {
        pre.push(lastItem + "/" + cur);
      } else {
        pre.push("/" + cur);
      }
    }
    return pre;
  }, []);
};

const findRoute = (paths: string[]) => {
  const selectRoutes: Array<RouteRecordNormalized> = [];
  let tempOrigin = router.getRoutes();
  paths.forEach((it) => {
    const selectRoute = tempOrigin.find((pIt) => pIt.path === it);
    if (selectRoute) {
      // tempOrigin = selectRoute.children as unknown as RouteRecordNormalized[];
      selectRoutes.push(selectRoute);
    }
  });
  return selectRoutes;
};

const generatorDropdown = (
  routes: Array<RouteRecordNormalized> | undefined,
  parentPath = "/"
) => {
  if (!routes) return;
  const tempArray: DropItem[] = [];
  routes.forEach((it) => {
    const tempItem: DropItem = {
      label: it.meta?.title as string,
      key: isExternal(it.path)
        ? it.path
        : it.path.startsWith("/")
        ? it.path
        : parentPath + "/" + it.path,
      children: [],
    };
    if (it.children && it.children.length > 0) {
      tempItem.children = generatorDropdown(
        it.children as RouteRecordNormalized[],
        tempItem.key
      );
    } else {
      delete tempItem.children;
    }
    tempArray.push(tempItem);
  });
  return tempArray;
};

const generatorBreadcrumb = () => {
  breadcrumbs.length = 0;
  const findedRoutes = findRoute(handlePath(route.path));
  const aa = generatorDropdown(findedRoutes);
  if (aa) {
    breadcrumbs.push(...aa);
  }
};

const handleSelect = (key: string) => {
  router.push(key);
};

watchEffect(() => {
  if (
    route.path.startsWith("/redirect") ||
    ["/login", "/404", "/405", "/403", "/500"].includes(route.path)
  )
    return;
  generatorBreadcrumb();
});
</script>

<template>
  <NBreadcrumb>
    <NBreadcrumbItem
      class="layout-crumbs-item"
      v-for="item in breadcrumbs"
      :key="item.key"
    >
      <NDropdown
        v-if="item.children && item.children.length > 0"
        :options="item.children"
        @select="handleSelect"
      >
        <span>
          {{ item.label }}
          <SvgIcon name="down" size="18" style="margin-bottom: 2px"></SvgIcon>
        </span>
      </NDropdown>
      <span v-else>{{ item.label }}</span>
    </NBreadcrumbItem>
  </NBreadcrumb>
</template>

<style lang="scss" scoped>
.layout-crumbs-item {
  font-size: 16px;
}
</style>
