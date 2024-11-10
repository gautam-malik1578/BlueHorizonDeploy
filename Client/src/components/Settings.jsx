import { useDispatch, useSelector } from "react-redux";
import styles from "./Settings.module.css";
import { setMapCenterRadius } from "../slices/searchSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMyLocation } from "../hooks/useMyLocation";
import { setUserCoords } from "../slices/userSlice";
import { ToogleShowAnnimation } from "../slices/settingSlice";
function Settings() {
  const dispatch = useDispatch();
  const mapRadius = useSelector((store) => store.search.mapCenterRadius);
  const isAnnimationOn = useSelector(
    (store) => store.setting.StopshowAnnimation
  );
  // const { myLat, myLng, errCode } = useMyLocation();
  const [radius, setRadius] = useState(mapRadius);
  return (
    <div style={{ backgroundColor: "white" }} className={styles.settings}>
      <h1 className={styles.head}>Change your prefrences here</h1>
      <form className={styles.form}>
        <div>
          <label htmlFor="radius">radius of map search(km)</label>
          <input
            type="text"
            name=""
            id="radius"
            value={radius}
            onChange={(e) => {
              setRadius(e.target.value);
            }}
            onBlur={() => {
              if (Number(radius)) {
                if (radius === mapRadius) return;
                dispatch(setMapCenterRadius(radius));
                toast.success(`radius changed to ${radius}`, {
                  icon: "😁",
                  style: {
                    backgroundColor: "var(--color-green)",
                    color: "var(--color-white)",
                  },
                });
              } else {
                toast.error("radius must be a number", {
                  icon: "😵",
                  style: {
                    backgroundColor: "var(--color-red)",
                    color: "var(--color-white)",
                  },
                });
                setRadius(1000);
              }
            }}
          />
        </div>
        {/* <div>
          <label htmlFor="defaultMapPosition">default map position</label>
          <select
            name=""
            id="defaultMapPosition"
            onBlur={(e) => {
              if (e.target.value === "my") {
                const { msg, myLat, myLng, errCode } = useMyLocation();
                if (errCode === 0) {
                  console.log(
                    "this is what we are sending to dispatch",
                    myLat,
                    myLng
                  );
                  dispatch(setUserCoords({ lat: myLat, lng: myLng }));
                } else {
                  console.log(
                    "we did  not dispacth any thing as error occured",
                    msg
                  );
                }
              }
            }}
          >
            <option value="delhi">delhi</option>
            <option value="my">my location</option>
          </select>
        </div> */}
        <div>
          <label htmlFor="Annimation">Stop Annimation After Once </label>
          <select
            name=""
            id="Annimation"
            onChange={(e) => {
              console.log("the value of e is", e.target.value);
              dispatch(ToogleShowAnnimation());
              let message = "the annimation will be shown regularly";
              if (e.target.value == "true") {
                message = "the annimation will only been shown once";
              }
              toast.success(message, {
                icon: "😁",
                style: {
                  backgroundColor: "var(--color-green)",
                  color: "var(--color-white)",
                },
              });
            }}
          >
            <option selected={isAnnimationOn} value={false}>
              false
            </option>
            <option selected={!isAnnimationOn} value={true}>
              true
            </option>
          </select>
        </div>
        <div>
          <label htmlFor="mode">dark mode</label>
          <select name="" id="mode" disabled>
            <option value={false}>false</option>
            <option value={true}>true</option>
          </select>
        </div>
      </form>
    </div>
  );
}

export default Settings;
