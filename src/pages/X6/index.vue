<script setup lang="ts">
import { onMounted } from "vue";
import { Graph } from "@antv/x6";

onMounted(() => {
  const graph = new Graph({
    container: document.getElementById("container"),
    width: 400,
    height: 400,
    background: {
      color: "#F2F7FA",
    },
    grid: {
      visible: true,
      type: "doubleMesh",
      args: [
        {
          color: "#eee", // 主网格线颜色
          thickness: 1, // 主网格线宽度
        },
        {
          color: "#ddd", // 次网格线颜色
          thickness: 1, // 次网格线宽度
          factor: 4, // 主次网格线间隔
        },
      ],
    },
    autoResize: true,
    panning: true,
    mousewheel: true,
  });
  const source = graph.addNode({
    shape: "rect",
    width: 100,
    height: 40,
    x: 100,
    y: 100,
    label: "edge",
  });
  console.log(source.prop());
  source.prop("size", { width: 120, height: 50 }); // 修改 x 坐标
  source.attr("rect/fill", "#ccc"); // 修改填充色，等价于 source.prop('attrs/rect/fill', '#ccc')
});
</script>

<template>
  <div style="width: 100%; height: 100%">
    <div id="container"></div>
  </div>
</template>

<style lang="scss" scoped></style>
