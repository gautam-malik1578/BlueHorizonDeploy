import { useForm } from "react-hook-form";
import styles from "./ResetPasswordForm.module.css";
import { useResetPassword } from "../hooks/useResetPassword";
import Loader from "./Loader";
function ResetPasswordForm({ setShowForm }) {
  const { register, reset, handleSubmit } = useForm();
  const {
    mutate: resetPassword,
    isLoading: resetting,
    error: resetingError,
  } = useResetPassword();
  function handleOnSubmit(data) {
    // console.log("this is what we are sending to resetpassword ", data);
    resetPassword(data, {
      onSuccess: () => {
        reset();
        setShowForm(false);
      },
    });
  }
  if (resetting) {
    return <Loader height={100} width={100} text="resetting" />;
  }
  return (
    <form onSubmit={handleSubmit(handleOnSubmit)} className={styles.form}>
      <div>
        <label htmlFor="newPassword">new Password</label>
        <input
          type="text"
          id="newPassword"
          {...register("newPassword")}
          required
        />
      </div>
      <button>reset</button>
    </form>
  );
}

export default ResetPasswordForm;
