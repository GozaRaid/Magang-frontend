import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useAddAboutSection = () => {
  return useMutation({
    mutationFn: async ({ aboutDescription, conferences, where, who }) => {
      try {
        const response = await axiosInstance.post(
          "/about",
          {
            aboutDescription,
            conferences,
            where,
            who,
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
    onSuccess: () => {
      console.log("About section added successfully");
    },
  });
};
