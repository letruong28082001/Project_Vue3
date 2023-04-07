import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import EmployeesList from "../views/employee/employee-list.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/employees",
    component: EmployeesList,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
