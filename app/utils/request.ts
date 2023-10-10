import axios from "axios";
import endpoints from "@/app/constants/endpoints";


const apiClient = axios.create({
  baseURL: endpoints.baseUrl,
});

apiClient.interceptors.request.use((request) => {
  return request;
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error) {
      throw new Error(error)
    }

    return Promise.reject(error);
  }
);

export default apiClient;
