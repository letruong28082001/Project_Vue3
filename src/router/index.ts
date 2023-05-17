import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import employeeList from "@/views/employee/employee-list.vue";
import Login from "../views/auth/LoginPage.vue";
import workUnit from "../views/work-unit/WorkUnit.vue";
import JobPosition from "@/views/job-position/JobPosition.vue";
import Supplier from "@/views/supplier/SuppplierPage.vue";
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
  {
    path: "/job-position",
    name: "JobPosition",
    component: JobPosition,
  },
  {
    path: "/supplier",
    name: "Supplier",
    component: Supplier,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  if (!localStorage.getItem("token") && to.name !== "Login") {
    return { name: "Login" };
  }
});

export default router;
