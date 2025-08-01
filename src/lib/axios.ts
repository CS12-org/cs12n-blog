import Axios from "axios";
import config from "./config";

const axios = Axios.create({
  timeout: 30 * 1000, // 30 seconds
  baseURL: config.VITE_PUBLIC_API_URL,
});

export default axios;
