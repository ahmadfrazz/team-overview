import axiosInstance from "./axios_instance";

export const get_session_trends = async (days: number) => {
  const { data } = await axiosInstance.get(
    `/api/interview/analytics/score-trends?days=${days}`
  );
  return data;
};
