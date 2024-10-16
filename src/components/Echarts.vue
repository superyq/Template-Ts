<script setup lang="ts">
import { onMounted, onUnmounted, useAttrs } from "vue";
import * as echarts from "echarts";

const props = defineProps({
  option: {
    type: Object,
    required: true,
  },
});

let myChart: any = null;
const attrs: any = useAttrs();
const initEchart = () => {
  // 绘制图表
  myChart.setOption(props.option);
};
const resize = () => {
  myChart.resize();
};

onMounted(() => {
  myChart = echarts.init(document.getElementById(attrs.id));
  initEchart();
  window.addEventListener("resize", resize);
});

onUnmounted(() => {
  myChart.setOption({
    echartsInstance: {
      dispose: false,
    },
  });
  window.removeEventListener("resize", resize);
});
</script>

<template>
  <div style="width: 100%; height: 100%">echarts no use</div>
</template>
