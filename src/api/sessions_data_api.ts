import { PAGE_SIZE } from "@/constants";
import axiosInstance from "./axios_instance";

export const get_sessions_data = async (page: number, pageSize = PAGE_SIZE) => {
  const { data } = await axiosInstance.get(
    `/api/interview/sessions?page=${page}&pageSize=${pageSize}`
  );
  return data;
};
