<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { onBeforeUnmount, ref, shallowRef, computed } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  toolbarConfig: {
    type: Object,
    default: {},
  },
  editorConfig: {
    type: Object,
    default: {
      placeholder: "请输入内容...",
    },
  },
  height: {
    type: String,
    default: "300px",
  },
});

const emits = defineEmits(["update:modelValue"]);
let valueHtml = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});

let style: any = computed(() => {
  return {
    height: props.height,
    "overflow-y": "hidden",
  };
});

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 模式
let mode = ref("default");

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
</script>

<template>
  <div class="editor-content-view">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      :style="style"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>

<style lang="scss" scoped>
.editor-content-view {
  border: 1px solid #ccc;
  z-index: 999;
}
</style>
