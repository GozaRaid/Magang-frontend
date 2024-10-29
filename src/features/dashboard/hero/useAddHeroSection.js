import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useAddHeroSection = () => {
  return useMutation({
    mutationFn: async ({ title, city, image }) => {
      try {
        const response = await axiosInstance.post(
          "/hero",
          {
            title,
            city,
            image,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "Content-Type": "multipart/form-data",
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
  });
};
