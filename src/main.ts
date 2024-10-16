import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/scss/index.scss";
import router from "@/router/index.ts";
import { createPinia } from "pinia";
// 指令
import directive from "@/directive/index.ts";
// 二次封装naive-ui组件批量引入
import initC from "./components/naive-ui";
// svg 组件
import SvgIcon from "@/components/SvgIcon.vue";
import "virtual:svg-icons-register";
// view 组件
import View from "@/components/View.vue";
// 图片预览
import Viewer from "v-viewer";
import "viewerjs/dist/viewer.css";

const pinia = createPinia();
const app = createApp(App);

initC(app);
app.use(directive);
app.use(pinia);
app.use(router);
app.use(Viewer);
app.component("svg-icon", SvgIcon);
app.component("View", View);

app.mount("#app");
