import { useMutation } from "@tanstack/react-query";
import { handleAddFav, handleRemoveFav } from "../services/favs";
import { useSelector } from "react-redux";

export function useFavs() {
  const token = useSelector((state) => state.user.token);
  const { mutate, error, isLoading } = useMutation({
    mutationKey: ["toggleFav"],
    mutationFn: async (data) => {
      let res;
      if (data.type === "add") {
        res = await handleAddFav(data.attractionId, token);
      } else {
        res = await handleRemoveFav(data.attractionId, token);
      }
      return res;
    },
  });
  return { mutate, error, isLoading };
}
