import { useSelector } from "react-redux";
import Attraction from "./Attraction";
import styles from "./cityDetails.module.css";
import { useQuery } from "@tanstack/react-query";
import { getAllatractionsOnACity } from "../services/getCities";
import Loader from "./Loader";
function CityDetails() {
  const selectedCityId = useSelector((state) => state.curCity.cityId);
  const cityName = useSelector((state) => state.curCity.name);

  const token = useSelector((state) => state.user.token);

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
        <Loader text="plz Login and select a city " height={300} width={300} />
      </div>
    );
  }

  return (
    <div className={styles.cityDetails}>
      <h2 className={styles.heading}>popular attractions of {cityName}</h2>
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
