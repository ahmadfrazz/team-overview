import axiosInstance from "./axios_instance";

export const get_single_session = async (id: string) => {
  const { data } = await axiosInstance.get(`/api/interview/sessions/${id}`);
  return data;
};
