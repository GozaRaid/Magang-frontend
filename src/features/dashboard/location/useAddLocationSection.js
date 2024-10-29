import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useAddLocationSection = () => {
  return useMutation({
    mutationFn: async ({ map_url }) => {
      try {
        const response = await axiosInstance.post(
          "/location",
          { map_url },
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
