import { createApp } from "vue";
import App from "./App.vue";

import "@/assets/styles.css"
import "@/assets/scripts.js"
import "@/assets/datatables-simple-demo.js"

import router from "./router";
createApp(App).use(router).mount("#app");
