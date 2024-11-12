import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8848/api",
});

export default api;
