import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchScheduleDate = () => {
  return useQuery({
    queryKey: ["schedule date"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/schedule/date");
        return response.data.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || error.message || "An error occurred"
        );
      }
    },
  });
};
