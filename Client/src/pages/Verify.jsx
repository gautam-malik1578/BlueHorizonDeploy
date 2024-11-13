import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken, setUserData, toggleLogIn } from "../slices/userSlice";
import toast from "react-hot-toast";
import styles from "./Verify.module.css";
const BASE_URL = "https://bluehorizondeploy.onrender.com/";
function Verify() {
  const [isRequestingOtp, setIsRequestingOtp] = useState(true);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsRequestingOtp((prev) => !prev);
    setMessage(""); // Clear previous messages
    setOtp("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const url = isRequestingOtp
      ? `${BASE_URL}/user/getotp`
      : `${BASE_URL}/user/verify`;

    const payload = isRequestingOtp ? { email } : { email, otp };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Success");
        if (isRequestingOtp) {
          handleToggle(); // Auto-toggle to OTP verification if OTP request is successful
          toast.success(`otp sent !`, {
            icon: "😁",
            style: {
              backgroundColor: "var(--color-green)",
              color: "white",
              textTransform: "capitalize",
            },
          });
        } else {
          // Dispatch user data to Redux if OTP verification is successful
          dispatch(setToken(data.token));
          dispatch(toggleLogIn());
          dispatch(
            setUserData({
              userId: data.userId,
              username: data.username,
              gender: data.gender,
            })
          );
          toast.success(`Welcome, ${data.username}!`, {
            icon: "😁",
            style: {
              backgroundColor: "var(--color-green)",
              color: "white",
              textTransform: "capitalize",
            },
          });
          navigate("/travel/search");
        }
      } else {
        setMessage(data.message || "An error occurred");
        setOtp("");
      }
    } catch (error) {
      setMessage("Network error: Unable to complete request");
      // console.log(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className={styles.container}>
      <h2>{isRequestingOtp ? "Request OTP" : "Verify OTP"}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {!isRequestingOtp && (
          <div className={styles.inputGroup}>
            <label>OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
        )}
        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? "Sending..." : isRequestingOtp ? "Get OTP" : "Verify"}
        </button>
      </form>
      {message && <p className={styles.message}>{message}</p>}

      {/* Show OTP reminder message when OTP is requested */}
      {/* {isRequestingOtp && !loading && email && ( */}
      <span className={styles.otpReminder}>
        Please check in spam as well for the OTP.
      </span>
      {/* )} */}

      <button
        onClick={handleToggle}
        className={styles.toggleButton}
        disabled={loading}
      >
        {isRequestingOtp
          ? "Already have an OTP? Verify"
          : "Need an OTP? Request"}
      </button>
    </div>
  );
}

export default Verify;
