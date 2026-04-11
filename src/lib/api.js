import axios from "axios";

function getCookie(name) {
  if (typeof document === "undefined") return null;
  return document.cookie.split("; ").reduce((acc, part) => {
    const [key, val] = part.split("=");
    return key === name ? val : acc;
  }, null);
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getCookie("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      document.cookie =
        "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
