import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import employeeList from "@/views/employee/employee-list.vue";
import Login from "../views/auth/LoginPage.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/employees",
    component: employeeList,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;
