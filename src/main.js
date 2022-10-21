import { createApp } from "vue";
import App from "./App.vue";
import "gitart-vue-dialog/dist/style.css";
import { GDialog } from "gitart-vue-dialog";

createApp(App).component("GDialog", GDialog).mount("#app");
