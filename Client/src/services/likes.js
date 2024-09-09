const BASE_URL = "http://127.0.0.1:8000/";
export async function handleLike(attractionId, token) {
  console.log("we entered in the likes services");
  const req = await fetch(
    `${BASE_URL}attractions/like/${attractionId}?token=${token}`,
    {
      method: "PATCH",
    }
  );
  const res = await req.json();
  console.log("this is what we are returning from the like services", res);
  return res;
}
export async function findMyLikedAttraction(token) {
  console.log(" we are in services of finding my liked attraction");
  const req = await fetch(`${BASE_URL}likes/me?token=${token}`);
  const res = await req.json();
  console.log(
    "this is what we are returning from find my liked attractions like services",
    res
  );
  return res;
}
