import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { changeAvatar } from "../services/user";

export function useUpdateAvatar() {
  const queryClient = useQueryClient();
  const token = useSelector((state) => state.user.token);
  const { mutate, isLoading, error } = useMutation({
    mutationKey: ["updateAvatar"],
    mutationFn: async (avatar) => await changeAvatar(avatar, token),
    onSuccess: () => {
      queryClient.refetchQueries(["findMe", token]);
      queryClient.invalidateQueries(["findMyReviews"]);
      toast.success("avatar changed successfully", {
        icon: "👍",
        style: { color: "var(--color-green)" },
      });
    },
  });
  return {
    mutate,
    isLoading,
    error,
  };
}
