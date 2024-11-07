import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useEditSpeakersByIdSection = () => {
  return useMutation({
    mutationFn: async ({ id, speaker }) => {
      try {
        const response = await axiosInstance.put(
          `/speakers/${id}`,
          {
            name: speaker.name,
            bio: speaker.bio,
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
    onSuccess: (data) => {
      console.log(data);
    },
  });
};
