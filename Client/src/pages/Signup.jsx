import { useForm } from "react-hook-form";
import styles from "./Signup.module.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSignUp } from "../hooks/useSignUp";
function SignUp() {
  const { mutate, error: signupError, isLoading: isSigningUp } = useSignUp();
  const navigate = useNavigate();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  function handleOnSubmit(data) {
    console.log(
      "the data we got from the submission of the data is ---->>>>>>",
      data
    );
    mutate(data, {
      onSuccess: () => {
        reset();
        navigate("/travel");
      },
    });
  }
  function handleOnError(err) {
    console.log(
      "we are at on error handelers so this is the boi---->>>>>>>",
      err
    );
  }
  return (
    <div className={styles.signup}>
      <h1>sign up for free!</h1>
      <form onSubmit={handleSubmit(handleOnSubmit, handleOnError)}>
        <div>
          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            required={true}
            {...register("username", {
              required: { value: true, message: "the username is required" },
              minLength: {
                value: 3,
                message: "the username must be 3 char long",
              },
            })}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: { value: true, message: "plz provide an email" },
              validate: (value) => {
                if (value.includes("chitkara.edu.in")) {
                  return true;
                } else {
                  return "plz signup with your chitkara email id";
                }
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="sex">gender</label>
          <select name="" id="sex" {...register("sex")}>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="others">others</option>
          </select>
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: { value: true, message: "plz provide a password" },
              minLength: {
                value: 8,
                message: "the password must be eight char long",
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <label htmlFor="cnfPassword"> confirm Password</label>
          <input
            type="password"
            id="cnfPassword"
            {...register("cnfPassword", {
              validate: (value) => {
                return value === watch("password") || "the password must match";
              },
            })}
          />
          {errors.cnfPassword && <p>{errors.cnfPassword.message}</p>}
        </div>
        <div>
          <button>signup</button>
        </div>
      </form>
      <Link to="/login">back to login</Link>
    </div>
  );
}

export default SignUp;
