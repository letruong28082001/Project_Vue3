import { defineStore } from "pinia";
import { axiosService } from "@/services/axios/axios";
export const apiStore = defineStore("Employee", {
  actions: {
    // login(url: string, data: any) {
    //   return axiosService.post(`${url}`, data);
    // },
    getAllEmployee(url: string, params: any) {
      return axiosService.get(url, params);
    },
  },
});
