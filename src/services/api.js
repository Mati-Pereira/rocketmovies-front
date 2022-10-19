import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.BACKEND_URL,
});
