import axios from "axios";
const https = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

https.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = "Bearer " + token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default https;
