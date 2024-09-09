import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getCities, getCitiesa } from "../services/getCities";
import { useState } from "react";

export const useGetCities = function (searchType) {
  //   const [cityData, setCityData] = useState([]);
  const {
    searchValue,
    // searchType,
    mapCenterLat,
    mapCenterLng,
    mapCenterRadius,
  } = useSelector((state) => state.search);
  let searchOptions = {};
  if (searchType === "map") {
    searchOptions = {
      searchType,
      lat: mapCenterLat,
      lng: mapCenterLng,
      rad: mapCenterRadius,
    };
  } else {
    // if (!searchValue)
    //   return console.log("retured from use cities eraly return");
    searchOptions = {
      searchType,
      value: searchValue,
    };
  }

  const { data, isLoading } = useQuery({
    queryKey: [
      "getCities",
      mapCenterLat,
      mapCenterLng,
      mapCenterRadius,
      searchValue,
      searchType,
    ],
    queryFn: async () => {
      const res = await getCitiesa(searchOptions);
      //   setCityData(res);
      return res;
    },
    onSuccess: (data) => {
      console.log("this is in onSuccess callback and the data is ", data);
      //   setCityData(data);
    },
    staleTime: 0,
  });
  return { data, isLoading };
};
