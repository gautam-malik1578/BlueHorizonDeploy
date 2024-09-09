import { useSelector } from "react-redux";
import { json } from "react-router";

const BASE_URL = "http://127.0.0.1:8000/";
export async function getCities(type, value) {
  console.log("what we got fro ythe type and value", type, value);
  if (value === "") return [];
  let capitalizeValue =
    value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  const res = await fetch(
    // "http://127.0.0.1:8000/cities?country=India&page=1&limit=3"
    `http://127.0.0.1:8000/cities?${type}=${capitalizeValue}`
  );
  const data = await res.json();
  console.log("boi we are here in the services ,", data);
  if (data.data.cities.length === 0) {
    console.log("the length was zero boi :(((");
    throw new Error("we could not find any city as such ");
  }
  return data.data.cities;
}
export async function getAllatractionsOnACity(id, token) {
  // const token = useSelector((state) => state.user.token);
  console.log("this is getAllAttaction data fjun 1", id);
  if (id === "" || token === "") {
    console.log(
      "boi we returend early in finding all attractions no api call was made"
    );
    throw new Error("plz login to go further");
  }
  const res = await fetch(
    // `${BASE_URL}attractions/city/65d1e5131a5ad5e8963b3660?token=${token}`,
    `${BASE_URL}attractions/city/${id}?token=${token}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // credentials: "include",
      //no body in get req so had to put token in query string  as cookie is not wornking somehow
    }
  );
  console.log("this is getAllAttaction data fjun 2", res);
  const data = await res.json();
  console.log("boi we are here in the services of attractions --->>>>,", data);
  if (data.status !== "success") {
    throw new Error("plz login in ");
  }
  return data.data.attractions;
}
export async function getCitiesa(searchOptions) {
  const { searchType, lat, lng, rad, value } = searchOptions;
  // let value, lat, lng, rad;
  console.log(
    "the values we have in services of finding the citi are ",
    searchOptions
  );

  let queryString = "";
  if (searchType === "map") {
    // ({ lat, lng, rad } = searchOptions);
    console.log("searched with near");
    if (!lat || !lng) return [];
    queryString = `${BASE_URL}cities/near/${lat}/${lng}/${rad}`;
  } else if (searchType === "attraction") {
    queryString = `${BASE_URL}cities/attraction/${value}`;
    console.log("we searched via attraction");
  } else {
    let capitalizeValue =
      value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    console.log("searched with no near");
    if (!value) {
      console.log("no value was given so returend before making aoi call");
      return [];
    }
    queryString = `${BASE_URL}cities?${searchType}=${capitalizeValue}`;
  }

  const res = await fetch(queryString);
  const data = await res.json();
  console.log("boi we are here in the services finding services ,", data);
  // if (data.data.cities.length === 0) {
  //   console.log("the length was zero boi :(((");
  //   throw new Error("we could not find any city as such ");
  // }
  return data.data.cities;
}
