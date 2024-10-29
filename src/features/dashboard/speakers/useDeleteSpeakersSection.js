import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useDeleteSpeakersSection = () => {
  return useMutation({
    mutationFn: async () => {
      try {
        const response = await axiosInstance.delete("/speakers", {
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
