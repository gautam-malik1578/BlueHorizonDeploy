const BASE_URL = "http://127.0.0.1:8000/";
export async function findPopularAttractions(max, token) {
  console.log(" we are in services of finding popular ");
  const req = await fetch(
    `${BASE_URL}attractions/popular/${max}?token=${token}`
  );
  const res = await req.json();
  // console.log(
  //   "this is what we are returning from find popular  services",
  //   res.data.popularAttractions
  // );
  return res.data.popularAttractions;
}
