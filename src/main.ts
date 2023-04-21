import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/global.css";

// import { createI18n } from "vue-i18n";
import i18n from "./configs/i18nLanguages";

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
app.use(i18n);
app.mount("#app");
