<script setup lang="ts">
import { RouterLink } from "vue-router";
import { computed } from "vue";

const props = defineProps({
  // @ts-ignore
  ...RouterLink.props,
  _target: {
    type: String,
    default: "_self",
  },
});

const isExternalLink = computed(
  () => typeof props.to === "string" && props.to.startsWith("http")
);
</script>

<template>
  <a v-if="isExternalLink" v-bind="$attrs" :href="to" :target="_target"
    ><slot
  /></a>
  <RouterLink v-else v-bind="$props" :to="$props.to"><slot /></RouterLink>
</template>
