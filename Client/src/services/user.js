import { json } from "react-router";

// const BASE_URL = "http://127.0.0.1:8000/";
const BASE_URL = "https://bluehorizondeploy.onrender.com/";
export async function fetchMyInfo(token) {
  // console.log("we are in the service to find me");
  const req = await fetch(`${BASE_URL}user/me?token=${token}`);
  const res = await req.json();
  // console.log(
  //   "this is what we are returning from the services of finding me",
  //   res
  // );
  return res;
}
export async function changeAvatar(avatar, token) {
  // console.log("we are in the service to change avatar");
  const req = await fetch(`${BASE_URL}user/avatar?token=${token}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ avatar }),
  });
  const res = await req.json();
  // console.log(
  //   "this is what we are returning from the services of changing avatar",
  //   res
  // );
  return res;
}
