import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import WorkUnit from "../views/work-unit/WorkUnit.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/work-unit",
    component: WorkUnit,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
