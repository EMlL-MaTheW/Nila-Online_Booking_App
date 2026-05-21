import axios from "axios";

// const API = axios.create({
//   baseURL: "http://127.0.0.1:8000/api",
// });
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


// ADD ACCESS TOKEN TO EVERY REQUEST
API.interceptors.request.use((config) => {

  const token = localStorage.getItem("access");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// AUTO REFRESH TOKEN
API.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest = error.config;

    // ACCESS TOKEN EXPIRED
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {

      originalRequest._retry = true;

      try {

        const refresh = localStorage.getItem("refresh");

        const res = await axios.post(
          "http://127.0.0.1:8000/api/token/refresh/",
          {
            refresh,
          }
        );

        const newAccess = res.data.access;

        localStorage.setItem("access", newAccess);

        // retry original request
        originalRequest.headers.Authorization =
          `Bearer ${newAccess}`;

        return API(originalRequest);

      } catch (refreshError) {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");

        window.location.href = "/";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;

// // services/api.ts

// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://127.0.0.1:8000/api",
// });

// API.interceptors.request.use((config) => {

//   const token = localStorage.getItem("access");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default API;