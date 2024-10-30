import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useAddSpeakersSection = () => {
  return useMutation({
    mutationFn: async ({ speakers, images }) => {
      console.log(speakers, images);
      try {
        const response = await axiosInstance.post(
          "/speakers",
          {
            speakers,
            images,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "Content-Type": "multipart/form-data",
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
