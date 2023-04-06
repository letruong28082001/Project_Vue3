import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginPage from "../views/auth/LoginPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: LoginPage,
  },
  // {
  //   path: "/Login",
  //   component: LoginPage,
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
