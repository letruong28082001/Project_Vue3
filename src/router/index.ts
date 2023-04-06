import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import EmployeesList from "../views/employee/employee-list.vue";
import testPage from "../views/test/testPage.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: EmployeesList,
  },
  {
    path: "/test",
    component: testPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
