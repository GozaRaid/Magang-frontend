import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchLocationSection = () => {
  return useQuery({
    queryKey: ["location"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/location");
        return response.data.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || error.message || "An error occurred"
        );
      }
    },
  });
};
