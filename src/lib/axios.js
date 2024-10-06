import axios from "axios";
import { apiurl } from "@/lib/config";

export const axiosInstance = axios.create({
  baseURL: apiurl.baseUrl,
});
