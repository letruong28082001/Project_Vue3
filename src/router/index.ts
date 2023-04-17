import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import employeeListVue from "@/views/employee/employee-list.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: employeeListVue,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;
