import { useSelector } from "react-redux";
import Attraction from "./Attraction";
import styles from "./cityDetails.module.css";
import { useQuery } from "@tanstack/react-query";
import { getAllatractionsOnACity } from "../services/getCities";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
function CityDetails() {
  // let cityId = null;
  // let { cityId } = useParams(); // Access cityId from URL
  // const selectedCityId = cityId;
  const selectedCityId = useSelector((state) => state.curCity.cityId);
  // const cityName = useSelector((state) => state.curCity.name);
  const token = useSelector((state) => state.user.token);
  const navigator = useNavigate();
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["attractionsOnACity", selectedCityId],
    queryFn: () => getAllatractionsOnACity(selectedCityId, token),
    onSuccess: (data) => {
      console.log("on successs did run bro  :))))))))))))", data);
    },
  });
  console.log(data, selectedCityId);
  if (!data) {
    // console.log(
    //   "were are loading the data for now ----------------------------"
    // );
    return (
      <div className={styles.cityDetails}>
        <Loader text="fetching..." height={300} width={300} />
      </div>
    );
  }

  return (
    <div className={styles.cityDetails}>
      <div className={styles.parent}>
        <button
          className={styles.backbtn}
          onClick={() => {
            navigator(-1);
          }}
        >
          <IoArrowBackOutline className={styles.icon} />
        </button>
        {/* <h2 className={styles.heading}>popular attractions of {cityName}</h2> */}
        <h2 className={styles.heading}>
          popular attractions of {data[0].cityName}
        </h2>
      </div>
      <div className={styles.abc}>
        {data
          ? data.map((attraction) => (
              <Attraction key={attraction._id} attraction={attraction} />
            ))
          : null}
      </div>
    </div>
  );
}

export default CityDetails;
