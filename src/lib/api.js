import axios from "axios";

function getCookie(name) {
  if (typeof document === "undefined") return null;
  return document.cookie.split("; ").reduce((acc, part) => {
    const [key, val] = part.split("=");
    return key === name ? val : acc;
  }, null);
}

const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const baseURL = rawApiUrl.replace(/\/+$/, "");

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getCookie("auth_token");
  if (token && !config.headers?.Authorization && !config.headers?.authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const cookieToken = getCookie("auth_token");
      const requestAuth =
        error.config?.headers?.Authorization ||
        error.config?.headers?.authorization ||
        "";
      const isSessionAuthRequest =
        cookieToken && requestAuth === `Bearer ${cookieToken}`;

      if (isSessionAuthRequest) {
        document.cookie =
          "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
