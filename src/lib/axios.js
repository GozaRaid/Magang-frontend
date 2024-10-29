import axios from "axios";
import { apiurl } from "@/lib/config";

const axiosInstance = axios.create({
  baseURL: apiurl.baseUrl,
});

axiosInstance.defaults.withCredentials = true;

export { axiosInstance };
