import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchScheduleSection = () => {
  return useQuery({
    queryKey: ["schedule"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/schedule");
        return response.data.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || error.message || "An error occurred"
        );
      }
    },
  });
};
