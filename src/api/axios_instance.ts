import { config } from "@/config";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: config.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
