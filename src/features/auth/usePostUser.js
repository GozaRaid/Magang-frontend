import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export const usePostUser = () => {
  return useMutation({
    mutationFn: async ({ username, password }) => {
      try {
        const response = await axiosInstance.post("/users", {
          username,
          password,
        });
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || error.message || "An error occurred"
        );
      }
    },
  });
};
