import { useDispatch, useSelector } from "react-redux";
import styles from "./CityItem.module.css";
import Tags from "./Tags";
import { cityClicked } from "../slices/curCitySlice";
import { useNavigate } from "react-router-dom";
import PicSlider from "./PicSlider";
let images = [
  "https://images.pexels.com/photos/5438965/pexels-photo-5438965.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/5458388/pexels-photo-5458388.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEyNjE4NTg5MzIzNjI0NjI2MA%3D%3D/original/55a2777a-fc80-4d7b-af05-a9f737ff8661.jpeg?im_w=1440&im_q=highq",
];
function CityItem({ city }) {
  const datay = useSelector((state) => state.curCity.cityId);
  if (city.imgs.length > 0) images = city.imgs;
  // console.log(datay);
  const dispatch = useDispatch();
  const navigator = useNavigate();
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
        navigator(`/travel/citydetail/${city._id}`);
      }}
    >
      <div className={styles.cityMeta}>
        {/* intro */}
        <div className={styles.intro}>
          <span className={styles.cityname}>{city.cityName}</span>
          <div className={styles.tagsList}>
            {/* <Tags type={"red"}>Reviewd</Tags> */}
            {/* <Tags type="red">Drafted</Tags> */}
            {/* <Tags type="green">Noted</Tags> */}
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
      <div className={styles.Imgslider}>
        <PicSlider images={images} />
      </div>
    </div>
  );
}

export default CityItem;
