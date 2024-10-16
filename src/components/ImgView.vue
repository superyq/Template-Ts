<script setup lang="ts">
defineProps({
  images: {
    type: Array<any>,
    required: true,
  },
});

const showImg = (index: any) => {
  (document.getElementsByClassName("show-img")[index] as any).click();
};

defineExpose({ showImg });
</script>

<template>
  <viewer :images="images" v-show="false">
    <div v-for="item in images">
      <img class="show-img" :src="item.src" />
    </div>
  </viewer>
</template>

<style lang="scss" scoped></style>
