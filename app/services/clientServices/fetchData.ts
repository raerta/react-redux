import apiClient from "@/app/utils/request";
import endpoints from "@/app/constants/endpoints";


export async function fetchData() {
  const response = await apiClient.get(endpoints.getAllData);
  return response.data;
}
