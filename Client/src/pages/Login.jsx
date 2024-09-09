import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../slices/userSlice";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useForm } from "react-hook-form";

function Login() {
  const { mutate, isLoading: isLogging, error } = useLogin();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  function onHandleSubmit(data) {
    console.log("the data we got in on hamdle submit is,", data);
    mutate(data, {
      onSuccess: () => {
        reset();
        navigate("/travel");
      },
    });
  }
  function onSubmitError(err) {
    console.log("this is onSubmiot error we have ,", err);
  }
  return (
    <div className={styles.login}>
      <h1>login to your account</h1>
      <form onSubmit={handleSubmit(onHandleSubmit, onSubmitError)}>
        <div>
          <label htmlFor="email">enter your email -</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: { value: true, message: "plz provide your email" },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password"> password -</label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: { value: true, message: "plz provide your password" },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button>login</button>
      </form>
      <h3>{"don't have an account ? sign up now"}</h3>
      <Link to="/signup">sign up</Link>
    </div>
  );
}

export default Login;
