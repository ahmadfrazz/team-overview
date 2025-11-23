import axiosInstance from "./axios_instance";

// export const get_users = async () => {
//   const { data } = await axiosInstance.get('/api/interview/users');
//   return data;
// };

export const get_user_performance = async () => {
  const { data } = await axiosInstance.get(
    "/api/interview/analytics/user-performance"
  );
  return data;
};
