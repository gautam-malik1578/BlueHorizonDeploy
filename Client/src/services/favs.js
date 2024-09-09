const BASE_URL = "http://127.0.0.1:8000/";
export async function handleAddFav(attractionId, token) {
  console.log("we entered the addFavs of servecies");
  const req = await fetch(
    `${BASE_URL}favorites/add/${attractionId}?token=${token}`
  );
  const res = await req.json();
  console.log("this is what we are returning from the addFav services");
  return res;
}
export async function handleRemoveFav(attractionId, token) {
  console.log("we entered the removeFavs of servecies");
  const req = await fetch(
    `${BASE_URL}favorites/remove/${attractionId}?token=${token}`
  );
  const res = await req.json();
  console.log("this is what we are returning from the removeFav services", res);
  return res;
}
export async function findMyFavs(token) {
  console.log(" we are in services of finding my favs ");
  const req = await fetch(`${BASE_URL}favorites/myfavs?token=${token}`);
  const res = await req.json();
  console.log("this is what we are returning from my favs service", res);
  return res;
}
