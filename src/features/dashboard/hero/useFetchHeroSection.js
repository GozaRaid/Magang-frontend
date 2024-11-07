import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchHeroSection = () => {
  return useQuery({
    queryKey: ["hero"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/hero");
        return response.data.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || error.message || "An error occurred"
        );
      }
    },
  });
};
