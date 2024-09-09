import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../services/password";
import toast from "react-hot-toast";
import { setToken } from "../slices/userSlice";

export function useResetPassword() {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const { mutate, isLoading, error } = useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: async (content) => await resetPassword(content, token),
    onSuccess: (data) => {
      dispatch(setToken(data.token));
      toast.success("password changed ", {
        icon: "😎",
        style: { color: "var(--color-green)", textTransform: "capitalize" },
      });
    },
  });
  return { mutate, isLoading, error };
}
