import styles from "./Button.module.css";
function Button({ children, type = "primary" }) {
  return (
    <button
      className={`${styles.btn} 
      ${styles.type}`}
    >
      {children}
    </button>
  );
}

export default Button;
