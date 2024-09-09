// import { useQuery } from "@tanstack/react-query";
import styles from "./Logo.module.css";
function Logo() {
  // const { data, refetch } = useQuery({ queryKey: ["login"], enabled: false });
  // console.log("the login data as follws for now <<<<<<<<<<<<------>>>>>", data);
  return (
    <div className={styles.logo}>
      <figure className={styles.fig}>
        <img src="/logo.jpeg" alt="logopic" />
      </figure>
      <h1 className={styles.heading}>Blue Horizon</h1>
    </div>
  );
}

export default Logo;
