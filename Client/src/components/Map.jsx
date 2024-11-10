import styles from "./Map.module.css";
import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import { useDispatch, useSelector } from "react-redux";
import { setMapCenterCoords } from "../slices/searchSlice";
import { useGetCities } from "../hooks/useGetCities";
import { cityClicked } from "../slices/curCitySlice";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "./Loader"; // Your Loader component
import anni1 from "../animations/anni1.json"; // Animation file

function Map({ classname }) {
  const val = useSelector((store) => store.setting.StopshowAnnimation);
  const [showAnimation, setShowAnimation] = useState(val); // Manage animation visibility

  // Hide animation after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 5000); // 3000 milliseconds = 3 seconds

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  const { searchType } = useSelector((state) => state.search);
  const { data } = useGetCities(searchType);
  const { lat, lng } = useSelector((state) => state.curCity);
  const coords = [lat || "28.7041", lng || "77.1025"];

  return (
    <div className={styles.parent}>
      {showAnimation ? (
        // Show animation for the first 3 seconds
        <div className={classname}>
          <Loader anni={anni1} text="Loading map..." height={300} width={300} />
        </div>
      ) : (
        // After 3 seconds, render the map
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
                style: {
                  color: "var(--color-red)",
                  textTransform: "capitalize",
                },
                duration: 700,
              })
            : null}

          {data?.map((city) => (
            <ShowOnMap key={city._id} city={city} />
          ))}
        </MapContainer>
      )}
    </div>
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
  };

  const eggMarkerIcon = new L.Icon({
    iconUrl: `${
      selectedCityId === city._id
        ? "https://cdn-icons-png.flaticon.com/512/9356/9356230.png"
        : "https://icon-library.com/images/marker-icon/marker-icon-16.jpg"
    }`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

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
  const isSearchViaMap = useSelector((state) => state.setting.searchViaMap);
  const dispatch = useDispatch();
  const map = useMap();
  useMapEvents({
    click: (e) => {
      console.log("Map clicked at", e);
    },
    dragend: () => {
      if (!isSearchViaMap) return;
      const { lat, lng } = map.getCenter();
      dispatch(setMapCenterCoords({ lat, lng }));
      dispatch(cityClicked({ cityId: "", name: "" }));
    },
  });
  return null;
}

export default Map;
