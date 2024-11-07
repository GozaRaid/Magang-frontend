import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchPararelSession = () => {
  return useQuery({
    queryKey: ["pararel-session"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/pararel-sessions");
        return response.data.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || error.message || "An error occurred"
        );
      }
    },
  });
};
