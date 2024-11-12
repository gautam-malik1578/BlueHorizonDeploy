const BASE_URL = "http://127.0.0.1:8000/";
export async function resetPassword(content, token) {
  console.log("we are in services of resetting the password");
  const req = await fetch(`${BASE_URL}user/resetpassword?token=${token}`, {
    method: "POST",
    body: JSON.stringify(content),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await req.json();
  // console.log(
  //   "this is what we are returning from the services of reseting password me",
  //   res
  // );
  return res;
}
