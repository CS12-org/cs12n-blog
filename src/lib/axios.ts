import Axios from "axios";
import publicConfig from "./public-config";

const axios = Axios.create({
  timeout: 30 * 1000, // 30 seconds
  baseURL: publicConfig.NEXT_PUBLIC_API_URL,
});

export default axios;
