import styles from "./Tags.module.css";
function Tags({ children, type = "blue" }) {
  return <span className={(`${styles.tags}`, styles[type])}>{children}</span>;
}

export default Tags;
