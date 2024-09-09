import { useMutation } from "@tanstack/react-query";
import { login } from "../services/login";
import { useDispatch } from "react-redux";
import { setToken, setUserData, toggleLogIn } from "../slices/userSlice";
import toast from "react-hot-toast";

export function useLogin() {
  const dispatch = useDispatch();
  const { mutate, error, isLoading } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data) => await login(data),
    onSuccess: (data) => {
      dispatch(setToken(data.token));
      dispatch(toggleLogIn());
      dispatch(
        setUserData({
          userId: data.userId,
          username: data.username,
          gender: data.gender,
        })
      );
      toast.success(`welcome back! ${data.username}`, {
        icon: "😁",
        style: {
          backgroundColor: "var(--color-green)",
          color: "white",
          textTransform: "capitalize",
        },
      });
    },
    onError: (err) => {
      // console.log("the error we revieved is --", err.message);
      toast.error(err.message, {
        position: "top-center",
        style: {
          backgroundColor: "var(--color-red)",
          color: "white",
          textTransform: "capitalize",
        },
        icon: "😢",
      });
    },
  });
  return { mutate, error, isLoading };
}
