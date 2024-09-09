import styles from "./NotFound.module.css";
function NotFound({ text = "oop's we could find anything", height, width }) {
  return (
    <div className={styles.notfound}>
      <figure style={{ height, width }}>
        {/* <img src="./notfound.jpeg" alt="notfound" /> */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/6180/6180130.png"
          alt="notfound"
        />
      </figure>
      <p>{text}</p>
    </div>
  );
}

export default NotFound;
