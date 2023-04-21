import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import employeeList from "@/views/employee/employee-list.vue";
import Login from "../views/auth/LoginPage.vue";
import workUnit from "../views/work-unit/WorkUnit.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/employees",
    component: employeeList,
  },
  {
    path: "/work-unit",
    component: workUnit,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;
