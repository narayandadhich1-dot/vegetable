import axios from "axios";

const baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8000/api/v1"
    : "https://vegetable-rk3y.onrender.com/api/v1";

const API = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
