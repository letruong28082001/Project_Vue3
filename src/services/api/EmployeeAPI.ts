import { defineStore } from "pinia";
import http from "@/services/axios/axios";
export const apiStore = defineStore("API", {
  actions: {
    getAllEmployee(url: string, page: number, limit: number) {
      return http.get(`/${url}?page=${page}&limit=${limit}`);
    },
  },
});
