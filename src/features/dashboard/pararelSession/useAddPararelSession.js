import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useAddPararelSession = () => {
  return useMutation({
    mutationFn: async ({ parallelSessions }) => {
      try {
        const response = await axiosInstance.post(
          "/pararel-sessions",
          {
            parallelSessions,
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
  });
};
