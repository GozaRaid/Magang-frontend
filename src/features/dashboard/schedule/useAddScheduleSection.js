import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useAddScheduleSection = () => {
  return useMutation({
    mutationFn: async ({ schedule }) => {
      try {
        const response = await axiosInstance.post(
          "/schedule",
          {
            schedule,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
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
