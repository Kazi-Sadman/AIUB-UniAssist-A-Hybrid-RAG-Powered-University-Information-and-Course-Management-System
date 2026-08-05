import axios from "axios";

// Point this at your running FastAPI server (uvicorn app.main:app --reload)
const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Normalizes FastAPI's { detail: "..." } error shape into a plain message string
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const detail = error?.response?.data?.detail;
    const message = Array.isArray(detail)
      ? detail.map((d) => d.msg).join(", ")
      : detail || error.message || "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

export default axiosClient;
