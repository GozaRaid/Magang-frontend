import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchSpeakersSection = () => {
  return useQuery({
    queryKey: ["speakers"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/speakers");
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || error.message || "An error occurred"
        );
      }
    },
  });
};
