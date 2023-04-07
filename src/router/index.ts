import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import StaffManagement from "@/views/team-management/TeamMemberPage.vue";
import WorkUnit from "@/views/work-unit/WorkUnitPage.vue";
import JobPosition from "@/views/job-position/JobPosition.vue";
import StaffList from "@/views/staff-list/StaffList.vue";
import StaffUpload from "@/views/staff-upload/StaffUpload.vue";
import Supplier from "@/views/supplier/SupplierPage.vue";
import Device from "@/views/device/DevicePage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/Staff",
    component: StaffManagement,
  },
  {
    path: "/WorkUnit",
    component: WorkUnit,
  },
  {
    path: "/JobPosition",
    component: JobPosition,
  },
  {
    path: "/StaffList",
    component: StaffList,
  },
  {
    path: "/StaffUpload",
    component: StaffUpload,
  },
  {
    path: "/Supplier",
    component: Supplier,
  },
  {
    path: "/Device",
    component: Device,
  },
  // ,
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   // component: () =>{}
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
