<script setup lang="ts">
import { shallowReactive } from "vue";

const emits = defineEmits(["clear"]);

const messages = shallowReactive([
  {
    title: "您收到一个消息",
    desc: "来自好友张三的生日祝福",
  },
  {
    title: "您收到一个消息",
    desc: "来自好友张三的生日祝福来自好友张三的生日祝福",
  },
  {
    title: "您收到一个消息",
    desc: "来自好友张三的生日祝福来自好友张三的生日祝福",
  },
  {
    title: "您收到一个消息",
    desc: "来自好友张三的生日祝福来自好友张三的生日祝福来自好友张三的生日祝福来自好友张三的生日祝福",
  },
  {
    title: "您收到一个消息",
    desc: "来自好友张三的生日祝福",
  },
  {
    title: "您收到一个消息",
    desc: "来自好友张三的生日祝福",
  },
]);

function onClearMessage() {
  messages.length = 0;
  emits("clear");
}
</script>

<template>
  <NCard
    :content-style="{ padding: '0px' }"
    :footer-style="{ padding: '0px' }"
    :bordered="false"
    :segmented="true"
  >
    <div v-if="messages.length > 0">
      <div class="u__flex-ac" v-for="(item, index) of messages" :key="index">
        <div class="u__flex-shark-0">
          <SvgIcon name="message" size="35"></SvgIcon>
        </div>
        <div>
          <div class="text-sm font-medium">{{ item.title }}</div>
          <NEllipsis :line-clamp="1" style="color: #6b7280">{{
            item.desc
          }}</NEllipsis>
        </div>
      </div>
    </div>
    <n-empty v-else description="暂无消息哦~" class="u__pt-20 u__pb-20" />
    <template #footer>
      <div class="u__flex-c action-box">
        <YButton text @click="onClearMessage">清空消息</YButton>
        <YButton text>查看更多</YButton>
      </div>
    </template>
  </NCard>
</template>

<style lang="scss" scoped>
.action-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 10px;
}
</style>
