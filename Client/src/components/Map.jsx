// import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import L, { popup } from "leaflet";
import { useDispatch, useSelector } from "react-redux";
import { setMapCenterCoords } from "../slices/searchSlice";
import { useGetCities } from "../hooks/useGetCities";
import { cityClicked } from "../slices/curCitySlice";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

// import { useState } from "react";
// import { useQueryClient } from "@tanstack/react-query";
function Map({ classname }) {
  console.log(
    "we are in thr map componentt-------------------------------------------"
  );
  const { searchType } = useSelector((state) => state.search);

  const { data } = useGetCities(searchType);
  const { lat, lng } = useSelector((state) => state.curCity);
  const coords = [lat || "28.7041", lng || "77.1025"];
  // const coords = ["51.505", "-0.09"];

  return (
    <MapContainer
      className={classname}
      center={coords}
      zoom={5}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <HandleClickMap />
      {data?.length > 0
        ? toast.success(`${data?.length} results found `, {
            icon: "😎",
            style: { color: "var(--color-red)", textTransform: "capitalize" },
            duration: 700,
          })
        : null}
      {console.log("this is the data<<<<----->>", data)}

      {data?.map((city) => (
        <ShowOnMap key={city._id} city={city} />
      ))}
    </MapContainer>
  );
}
function ShowOnMap({ city }) {
  const {
    cityId: selectedCityId,
    lat: late,
    lng: longi,
  } = useSelector((state) => state.curCity);
  const map = useMap();
  if (late && longi) {
    map.closePopup();
    map.setView([late, longi]);
    // map.openPopup([late, longi]);
  }

  const navigator = useNavigate();
  const dispatch = useDispatch();
  const handleMarkerClick = () => {
    dispatch(
      cityClicked({
        cityId: city._id,
        name: city.cityName,
        lat: city.lat,
        lng: city.lng,
      })
    );
    console.log(
      "boid u just clickecd on the city name =========>>",
      city.cityName
    );
    // navigator(`/travel/citydetail/${city._id}`);
  };
  //custom marker
  const eggMarkerIcon = new L.Icon({
    iconUrl: `${
      selectedCityId === city._id
        ? "https://cdn-icons-png.flaticon.com/512/9356/9356230.png"
        : "https://icon-library.com/images/marker-icon/marker-icon-16.jpg"
    }`,
    iconSize: [32, 32], // Set the size of your icon
    iconAnchor: [16, 32], // Set the anchor point of your icon
    popupAnchor: [0, -32], // Set the popup anchor of your icon
  });
  // const handlePopClick = () => {
  //   navigator(`/travel/citydetail/${city._id}`);
  // };
  return (
    <Marker
      position={[city.lat, city.lng]}
      eventHandlers={{ click: handleMarkerClick }}
      icon={eggMarkerIcon}
    >
      <Popup closeOnClick={true}>
        {city.cityName && <span>{city.cityName}</span>}
        {city.todos.length && (
          <div>{city.todos.length} attractions found !!</div>
        )}
        <Link to={`/travel/citydetail/${city._id}`}>check</Link>
      </Popup>
    </Marker>
  );
}
function HandleClickMap() {
  const isSreachViaMap = useSelector((state) => state.setting.searchViaMap);
  const dispatch = useDispatch();
  const map = useMap();
  useMapEvents({
    click: (e) => {
      console.log(
        "you clicked the map and the e obj is -------.......>>>>>>>>>>",
        e
      );
    },
    // dragstart: (e) => {
    //   console.log("the map started movinging", e);
    // },
    dragend: (e) => {
      console.log(
        "boi the drang envet ended here so lets see what is going on >>>>>>>>>>>>>>>",
        isSreachViaMap
      );
      if (!isSreachViaMap)
        return console.log(
          "returen early from the darg event as map search is off::::))))))"
        );
      const { lat, lng } = map.getCenter();
      dispatch(setMapCenterCoords({ lat, lng }));
      dispatch(cityClicked({ cityId: "", name: "" }));
    },
  });
  return null;
}
export default Map;
