import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { handleLike } from "../services/likes";

export function useLikes() {
  const token = useSelector((state) => state.user.token);
  const { mutate, error, isLoading } = useMutation({
    mutationKey: ["likes"],
    mutationFn: async (attractionId) => await handleLike(attractionId, token),
  });
  return { mutate, error, isLoading };
}
