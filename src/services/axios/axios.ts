import axios from "axios";
const axiosService = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

axiosService.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = "Bearer " + token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { axiosService };
