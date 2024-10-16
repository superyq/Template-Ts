<script setup lang="ts">
import { computed, watch, h, ref } from "vue";
import { useTagStore } from "@/store/tag.ts";
import { usePermissionStore } from "@/store/permission.ts";
import { useRouter, useRoute } from "vue-router";
import SvgIcon from "@/components/SvgIcon.vue";
import { ITag } from "@/model/common.ts";

const router = useRouter();
const route = useRoute();
const tagStore = useTagStore();
const permissionStore = usePermissionStore();

let tags = computed(() => {
  return tagStore.tags;
});

watch(
  () => route.path,
  (value) => {
    const obj = { title: route.meta.title, key: value };
    tagStore.addTag(obj);
  },
  {
    immediate: true,
  }
);

const handleClose = (key: string) => {
  tagStore.removeTag(key);

  if (permissionStore.activeMenuValue == key) {
    router.push(tagStore.activeTag);
  }
};
const handleCheck = (item: ITag) => {
  let { key } = item;
  router.push(key);
};

const contextMenuOptions = [
  {
    label: "关闭所有",
    key: "close",
    icon() {
      return h(SvgIcon, { name: "menu" });
    },
  },
];
const onDropDownSelect = (key: string) => {
  switch (key) {
    case "close":
      let path = tagStore.clearTag();
      router.push(path);
      break;
  }
};

const scrollbar = ref(null);
const rightArrowClick = () => {
  const _scrollbar = scrollbar.value as any;
  const scrollX = _scrollbar.$el.scrollLeft || 0;
  _scrollbar.scrollTo(
    {
      left: scrollX + 200,
      debounce: false,
      behavior: "smooth",
    } as any,
    0
  );
  isDisabledArrow();
};
const leftArrowClick = () => {
  const _scrollbar = scrollbar.value as any;
  const scrollX = _scrollbar.$el?.scrollLeft || 0;
  _scrollbar.scrollTo(
    {
      left: Math.max(0, scrollX - 200),
      debounce: true,
      behavior: "smooth",
    } as any,
    0
  );
  isDisabledArrow();
};
let rightArrowDisabled = ref(false);
let leftArrowDisabled = ref(false);
const isDisabledArrow = () => {
  setTimeout(() => {
    const _scrollbar = scrollbar.value as any;
    const { scrollLeft, scrollWidth, clientWidth } =
      _scrollbar.$el as HTMLElement;
    leftArrowDisabled.value = scrollLeft === 0;
    rightArrowDisabled.value = scrollLeft === scrollWidth - clientWidth;
  }, 100);
};
</script>

<template>
  <div class="layout-header__tag">
    <SvgIcon
      :class="{ 'arrow-wrapper__disabled': rightArrowDisabled }"
      class="u__cursor"
      name="arrow"
      @click="leftArrowClick"
    ></SvgIcon>
    <NScrollbar ref="scrollbar" :x-scrollable="true" :size="0">
      <div class="u__flex-ac" style="height: 30px">
        <NTag
          v-for="item in tags"
          :key="item.key"
          class="tag-item"
          :closable="item.key !== '/home'"
          :type="item.key == permissionStore.activeMenuValue ? 'success' : 'default'"
          size="small"
          @close="handleClose(item.key)"
          @click="handleCheck(item)"
          >{{ item.title }}</NTag
        >
      </div>
    </NScrollbar>
    <SvgIcon
      :class="{ 'arrow-wrapper__disabled': rightArrowDisabled }"
      class="u__cursor"
      name="arrow"
      style="transform: rotate(180deg)"
      @click="rightArrowClick"
    ></SvgIcon>
    <NDropdown
      :options="contextMenuOptions"
      placement="left-start"
      @select="onDropDownSelect"
    >
      <SvgIcon class="u__cursor" name="menu" size="18"></SvgIcon>
    </NDropdown>
  </div>
</template>

<style lang="scss" scoped>
.layout-header__tag {
  display: flex;
  align-items: center;
  height: 30px;
  padding-right: 10px;
  .arrow-wrapper {
    cursor: pointer;
    font-size: 20px;
    margin: 0 8px;
  }
}
.tag-item {
  margin-right: 5px;
  cursor: pointer;
}
.arrow-wrapper__disabled {
  cursor: not-allowed;
  // color: #b9b9b9;
  color: red;
}
</style>
