<script setup lang="ts">
import { ref } from "vue";
import Rich from "@/components/Rich.vue";

let richHtml = ref("");

let editorConfig = ref({});
let toolbarConfig = ref({});
let height = ref("400px");
</script>

<template>
  <div class="page-rich">
    <Rich v-model="richHtml" :editorConfig="editorConfig" :toolbarConfig="toolbarConfig" :height="height"/>
  </div>
</template>

<style lang="scss" scoped></style>
