import styles from "./NavOptions.module.css";
function NavOptions({ children }) {
  return <div className={styles.navOptions}>{children}</div>;
}

export default NavOptions;
