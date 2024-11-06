import Loader from "./Loader";
import styles from "./NotFound.module.css";
import anni404 from "../animations/anni404.json";
function NotFound({ text = "oop's we could find anything", height, width }) {
  return (
    <div className={styles.notfound}>
      <Loader showText={false} anni={anni404} height={height} width={width} />
      <p>{text}</p>
    </div>
  );
}

export default NotFound;

// import styles from "./NotFound.module.css";
// function NotFound({ text = "oop's we could find anything", height, width }) {
//   return (
//     <div className={styles.notfound}>
//       <figure style={{ height, width }}>
//         {/* <img src="./notfound.jpeg" alt="notfound" /> */}
//         <img
//           src="https://cdn-icons-png.flaticon.com/512/6180/6180130.png"
//           alt="notfound"
//         />
//       </figure>
//       <p>{text}</p>
//     </div>
//   );
// }
