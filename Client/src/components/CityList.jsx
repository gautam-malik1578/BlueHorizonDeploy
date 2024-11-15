import { useEffect, useState } from "react";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import SearchBar from "./SearchBar";
import { useQuery } from "@tanstack/react-query";
import { getCities } from "../services/getCities";
import { useSelector } from "react-redux";
import NotFound from "./NotFound";
import Loader from "./Loader";
import SearchSuggetion from "./SearchSuggetion";
import { useGetCities } from "../hooks/useGetCities";
function CityList() {
  const [cityData, setCityData] = useState([]);
  const { searchValue, searchType } = useSelector((state) => state.search);
  const { data, isLoading } = useGetCities(searchType);
  useEffect(() => {
    if (data) {
      setCityData(data);
    }
  }, [data]);

  return (
    <div className={styles.cityList}>
      {/* <div className={styles.searchbar}></div> */}
      {/* { searchType=="map"?} */}
      <SearchBar setCityData={setCityData} />
      <div className={styles.list}>
        {!searchValue && searchType !== "map" && <SearchSuggetion />}
        {searchValue || searchType === "map" ? (
          isLoading ? (
            <Loader text="searching..." height={200} width={200} />
          ) : cityData.length === 0 ? (
            <NotFound />
          ) : (
            cityData?.map((city) => <CityItem key={city._id} city={city} />)
          )
        ) : null}
      </div>
    </div>
  );
}

export default CityList;
