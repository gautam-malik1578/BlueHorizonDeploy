import styles from "./Travel.module.css";
import Map from "../components/Map";
import { useDispatch, useSelector } from "react-redux";
import CityList from "../components/CityList";
import CityDetails from "../components/cityDetails";
import { searchViaMapToogle, showMapToggle } from "../slices/settingSlice";
import { search } from "../slices/searchSlice";
import { Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  HiMiniMap,
  HiMiniMapPin,
  HiOutlineBookOpen,
  HiOutlinePencil,
} from "react-icons/hi2";
function Travel() {
  const { searchViaMap, showMap } = useSelector((state) => state.setting);
  const searchType = useSelector((state) => state.search.searchType);
  const dispatch = useDispatch();
  console.log(
    "this is what we got from search via map  ,",
    searchViaMap,
    showMap
  );
  // Get the current URL
  const navigator = useNavigate();
  const location = useLocation();
  console.log(
    "Current URL------------------------------------------:",
    location.pathname
  );
  return (
    <div className={styles.travelMain}>
      <Outlet className={styles.travelMainItem} />
      <div className={styles.btns}>
        {/* <button
          onClick={() => {
            dispatch(showMapToggle());
            if (showMap) {
              navigator("search");
            } else {
              navigator("map");
            }
            // dispatch(search({ searchType: "map", searchValue: "" }));
          }}
        >
          {showMap ? (
            <>
              <HiOutlineBookOpen className={styles.icon} />
              <span>show List</span>
            </>
          ) : (
            <>
              <HiMiniMap className={styles.icon} /> <span>Show map</span>
            </>
          )}
        </button> */}
        {/* this is where one btn ends and another starts ------>>>>*/}
        <button
          onClick={() => {
            if (searchType === "map") {
              dispatch(search({ searchType: "country", searchValue: "" }));
              dispatch(searchViaMapToogle());
              navigator("search");
            } else {
              dispatch(search({ searchType: "map", searchValue: "" }));
              dispatch(searchViaMapToogle());
              navigator("map");
            }
          }}
        >
          {searchType === "map" ? (
            <>
              <HiOutlinePencil className={styles.icon} />
              <span>Normal Search</span>
            </>
          ) : (
            <>
              <HiMiniMapPin className={styles.icon} />
              <span> Map Search</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// return (
//   <div className={styles.travelMain}>
//     {isSreachViaMap ? (
//       <>
//         <CityList classname={styles.travelMainItem} />
//         <Map classname={styles.travelMainItem} />
//         <div>
//           <button
//             onClick={() => {
//               dispatch(searchViaMapToogle());
//             }}
//           >
//             {isSreachViaMap ? "show details" : "show map"}
//           </button>
//           <button
//             onClick={() => {
//               if (searchType === "map") {
//                 dispatch(search({ searchType: "country", searchValue: "" }));
//               } else {
//                 dispatch(search({ searchType: "map", searchValue: "" }));
//                 dispatch(searchViaMapToogle());
//               }
//             }}
//           >
//             {searchType !== "map" ? "Map Search" : "Normal Search"}
//           </button>
//         </div>
//       </>
//     ) : (
//       <>
//         <CityList />
//         <CityDetails classname={styles.travelMainItem} />
//         <div>
//           <button
//             onClick={() => {
//               dispatch(searchViaMapToogle());
//               dispatch(search({ searchType: "map", searchValue: "" }));
//             }}
//           >
//             {isSreachViaMap ? "show details" : "show map"}
//           </button>
//           <button
//             onClick={() => {
//               if (searchType === "map") {
//                 dispatch(search({ searchType: "country", searchValue: "" }));
//               } else {
//                 dispatch(search({ searchType: "map", searchValue: "" }));
//                 dispatch(searchViaMapToogle());
//               }
//             }}
//           >
//             {searchType !== "map" ? "Map Search" : "Normal Search"}
//           </button>
//         </div>
//       </>
//     )}
//   </div>
// );
// }

export default Travel;
