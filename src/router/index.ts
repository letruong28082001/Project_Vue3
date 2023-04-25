import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import employeeList from "@/views/employee/employee-list.vue";
import Login from "../views/auth/LoginPage.vue";
import workUnit from "../views/work-unit/WorkUnit.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/employees",
    name: "Employees",
    component: employeeList,
  },
  {
    path: "/work-unit",
    name: "WorkUnit",
    component: workUnit,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;
