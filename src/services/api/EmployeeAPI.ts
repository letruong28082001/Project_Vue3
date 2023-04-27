import { defineStore } from "pinia";
import { axiosService } from "@/services/axios/axios";
export const apiStore = defineStore("Employee", {
  actions: {
    login(url: string, data: any) {
      return axiosService.post(`${url}`, data);
    },
    getAll(url: string, page: number, limit: number) {
      return axiosService.get(`/${url}?page=${page}&limit=${limit}`);
    },
  },
});
