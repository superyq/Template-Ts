<script setup lang="ts">
import Echarts from "@/components/Echarts.vue";

let option = {
  dataset: {
    source: {
      product: ["Matcha Latte", "Milk Tea", "Cheese Cocoa", "Walnut Brownie"],
      count: [823, 235, 1042, 988],
      score: [95.8, 81.4, 91.2, 76.9],
    },
  },
  xAxis: { type: "category" },
  yAxis: {},
  legend: {},
  series: [{ type: "bar" }, { type: "bar" }],
};
</script>

<template>
  <div style="width: 100%; height: 400px">
    <Echarts id="demo1" :option="option" />
  </div>
</template>
