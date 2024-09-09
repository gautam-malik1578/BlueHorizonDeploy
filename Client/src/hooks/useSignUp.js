import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { signup } from "../services/signup";
import { setToken, setUserData, toggleLogIn } from "../slices/userSlice";
import toast from "react-hot-toast";

export function useSignUp() {
  const dispatch = useDispatch();
  const { mutate, error, isLoading } = useMutation({
    mutationKey: ["signUp"],
    mutationFn: async (data) => await signup(data),
    onSuccess: (data) => {
      console.log("boi we are in success of sign mutate:)))", data);
      dispatch(setToken(data.token));
      dispatch(toggleLogIn());
      dispatch(
        setUserData({
          userId: data.userId,
          username: data.username,
          gender: data.gender,
        })
      );
      toast.success(`welcome !! ${data.username}`, {
        icon: "😁",
        style: {
          backgroundColor: "var(--color-green)",
          color: "white",
          textTransform: "capitalize",
        },
      });
    },
    onError: (err) => {
      console.log("we are in usesignup on error ,", err);
      toast.error(err.message, {
        position: "top-center",
        duration: 6000,
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
