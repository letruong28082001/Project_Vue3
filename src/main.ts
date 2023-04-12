import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/global.css";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

import PrimeVue from "primevue/config";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import { createPinia } from "pinia";

const pinia = createPinia();

const app = createApp(App);
app.use(store);
app.use(router);
app.use(PrimeVue);
app.use(pinia);
app.mount("#app");
