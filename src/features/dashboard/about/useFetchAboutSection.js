import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchAboutSection = () => {
  return useQuery({
    queryKey: ["about"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/about");
        return response.data.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || error.message || "An error occurred"
        );
      }
    },
  });
};
