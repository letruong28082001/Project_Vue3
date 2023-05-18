import axios from "axios";
const axiosService = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export function sleep(ms = 0): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

axiosService.interceptors.response.use(
  async function (response) {
    await sleep();
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { axiosService };
