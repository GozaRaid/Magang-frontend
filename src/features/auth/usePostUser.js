import { useMutation } from "@tanstack/react-query";
import { usePostAuth } from "@/features/auth/usePostAuth";
import { axiosInstance } from "@/lib/axios";

export const usePostUser = () => {
  const postAuthMutation = usePostAuth();

  return useMutation({
    mutationFn: async ({ username, password, keyword }) => {
      try {
        const response = await axiosInstance.post("/users", {
          username,
          password,
          keyword,
        });
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || error.message || "An error occurred"
        );
      }
    },
    onSuccess: (data) => {
      postAuthMutation.mutate({
        username: data.username,
        password: data.password,
      });
    },
  });
};
