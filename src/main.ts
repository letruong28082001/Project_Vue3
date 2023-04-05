import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/global.css";

import PrimeVue from "primevue/config";
import InputText from "primevue/inputtext";
import LoginButton from "primevue/button";
import MyPassword from "primevue/password";

import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(PrimeVue);

app.component("InputText", InputText);
app.component("LoginButton", LoginButton);
app.component("MyPassword", MyPassword);

app.mount("#app");
