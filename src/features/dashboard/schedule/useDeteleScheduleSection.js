import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useDeleteScheduleSection = () => {
  return useMutation({
    mutationFn: async () => {
      try {
        const response = await axiosInstance.delete("/schedule", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || error.message || "An error occurred"
        );
      }
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
};
