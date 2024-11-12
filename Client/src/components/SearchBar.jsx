import { useEffect, useState } from "react";
import styles from "./SearchBar.module.css";
import { useQuery } from "@tanstack/react-query";
import { getCities } from "../services/getCities";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../slices/searchSlice";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { setMapFalse } from "../slices/settingSlice";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
function SearchBar({ setCityData }) {
  const mapRadius = useSelector((store) => store.search.mapCenterRadius);
  const { searchType, searchValue } = useSelector((state) => state.search);
  const [value, setValue] = useState(searchValue);
  const [type, setType] = useState(searchType);
  const dispatch = useDispatch();
  // console.log(
  //   "the value of searchTYpe and search value is ++++++++++,",
  //   searchType,
  //   searchValue
  // );
  useEffect(() => {
    dispatch(search({ searchType: "country", searchValue: "" }));
    dispatch(setMapFalse());
  }, []);
  return (
    <div className={styles.outBox}>
      <span>hello</span>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(search({ searchType: type, searchValue: value }));
        }}
      >
        <HiOutlineMagnifyingGlass className={styles.icon} />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => {
            setValue(e.target.value);
            dispatch(search({ searchType: type, searchValue: e.target.value }));
          }}
          placeholder={
            searchType === "map"
              ? `search in radius of ${mapRadius}km`
              : `enter the ${type} here`
          }
          className={styles.input}
          disabled={searchType === "map"}
        />
        <select
          value={searchType}
          onChange={(e) => {
            setType(e.target.value);
            dispatch(
              search({ searchType: e.target.value, searchValue: value })
            );
          }}
          className={styles.selection}
        >
          <option value="country">Country</option>
          <option value="cityName">City</option>
          <option value="attraction">Attraction</option>
          <option value="map" disabled>
            Map
          </option>
        </select>
      </form>
    </div>
  );
}

export default SearchBar;
