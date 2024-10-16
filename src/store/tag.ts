import { defineStore } from "pinia";
import { ITag } from "@/model/common.ts";
import { deepClone } from "@/utils/index.ts";

export const useTagStore = defineStore({
  id: "tag",
  state: () => {
    return {
      tags: [
        { title: "首页", key: "/home" },
        // {
        //   title:
        //     "首页撒旦反抗江哈斯看见对方哈士大夫卡省的夫卡是的发来看哈士大夫立刻就和立刻就会离阿斯顿发射点发哈是放大看哈撒旦开发就和开h",
        //   key: "/home",
        // },
      ],
      activeTagIndex: 0,
      activeTag: "/home",
    };
  },
  getters: {
    tagsKey: (state) => {
      return state.tags.map((tag) => {
        return tag.key;
      });
    },
  },
  actions: {
    addTag(tag: ITag) {
      if (!this.tagsKey.includes(tag.key)) {
        this.tags.push(tag);
      }
      this.activeTag = tag.key;
    },
    removeTag(key: string) {
      let index = this.tagsKey.indexOf(key);
      this.tags.splice(index, 1);
      this.activeTag = this.tags[index - 1].key;
    },
    clearTag() {
      const arr = deepClone(this.tags);
      this.tags = arr.filter((item: ITag) => {
        if (item.key == "/home" || item.key == this.activeTag) {
          return true;
        }
      });
      return this.activeTag;
    },
  },
});
