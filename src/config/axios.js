import axios from "axios";
const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001/"
    : "https://secret-vault-backend.vercel.app/";

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
