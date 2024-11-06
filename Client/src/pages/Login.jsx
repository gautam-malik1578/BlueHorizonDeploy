import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../slices/userSlice";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useForm } from "react-hook-form";
import loginAnni1 from "../animations/loginAnni1.json";
import Loader from "../components/Loader";

function Login() {
  const [showAnimation, setShowAnimation] = useState(true); // Control visibility of animation

  // Hide the animation after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 3900); // 3000 milliseconds = 3 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const { mutate, isLoading: isLogging, error } = useLogin();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function onHandleSubmit(data) {
    console.log("the data we got in on handle submit is,", data);
    mutate(data, {
      onSuccess: () => {
        reset();
        navigate("/travel/search");
      },
    });
  }

  function onSubmitError(err) {
    console.log("this is onSubmit error we have,", err);
  }

  return (
    <div className={styles.loginPage}>
      {showAnimation ? (
        // Show animation for the first 3 seconds
        <div className={styles.loginAnnimation}>
          <Loader
            anni={loginAnni1}
            text="let's get logged in !!"
            height={300}
            width={300}
          />
        </div>
      ) : (
        // Show the login form after the animation
        <div className={styles.parent}>
          {/* <div className={styles.sideImg}>
            <figure className={styles.sidefig}>
              <img
                src="../../public/login1.jpg"
                alt=""
                className={styles.sidePic}
              />
            </figure>
          </div> */}
          <div className={styles.login}>
            <h1>login to your account</h1>

            <form onSubmit={handleSubmit(onHandleSubmit, onSubmitError)}>
              <div>
                <label htmlFor="email">Email </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "plz provide your email",
                    },
                  })}
                />
                {errors.email && <p>{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="password">password </label>
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "plz provide your password",
                    },
                  })}
                />
                {errors.password && <p>{errors.password.message}</p>}
              </div>
              <button>login</button>
            </form>
            <h3>{"don't have an account ? sign up now"}</h3>
            <Link to="/signup">sign up</Link>
            <h3>{"Not verified yet? verify Now!!"}</h3>
            <Link to="/verify">verify</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
