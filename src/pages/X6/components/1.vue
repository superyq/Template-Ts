<script setup lang="ts">
import { Graph } from "@antv/x6";

const graph = new Graph({
  container: document.getElementById("container"),
  autoResize: true,
});
</script>

<template>
  <div style="width: 100%; height: 100%">
    <div id="container"></div>
  </div>
</template>

<style lang="scss" scoped></style>
