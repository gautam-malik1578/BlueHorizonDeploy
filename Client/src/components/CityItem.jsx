import { useDispatch, useSelector } from "react-redux";
import styles from "./CityItem.module.css";
import Tags from "./Tags";
import { cityClicked } from "../slices/curCitySlice";
function CityItem({ city }) {
  const datay = useSelector((state) => state.curCity.cityId);
  // console.log(datay);
  const dispatch = useDispatch();
  return (
    <div
      className={`${styles.CityItem} ${
        datay === city._id ? styles.active : ""
      }`}
      onClick={() => {
        console.log(
          "we clicked a city with name and id",
          city.cityName,
          city._id
        );
        dispatch(
          cityClicked({
            cityId: city._id,
            name: city.cityName,
            lat: city.lat,
            lng: city.lng,
          })
        );
      }}
    >
      {/* intro */}
      <div className={styles.intro}>
        <span className={styles.cityname}>{city.cityName}</span>
        <div className={styles.tagsList}>
          <Tags type={"blue"}>Reviewd</Tags>
          <Tags type="red">Drafted</Tags>
          <Tags type="green">Noted</Tags>
        </div>
      </div>
      {/*  sub intro */}
      <div className={styles.subIntro}>
        <p>{city.country}</p>
        <p>{city.currency}</p>
        <p>Asia</p>
      </div>
      {/* to dos */}
      <div className={styles.todos}>
        <p>Attractions-</p>
        <div className={styles.tagsList}>
          {city.todos.map((todo, i) => {
            if (i > 1) {
              // console.log(
              //   "here we compared that  i which is index with current iteratiohn",
              //   i,
              //   i > 1
              // );
              // );
              return null;
            } else {
              return <Tags key={todo}>{todo}</Tags>;
            }
          })}
          {/* <Tags>india gate</Tags>
          <Tags>red fort</Tags>
          <Tags>chandi chowk</Tags> */}
          {city.todos.length > 2 ? <Tags>+ more &nbsp;</Tags> : null}
        </div>
      </div>
    </div>
  );
}

export default CityItem;
