const BASE_URL = "http://127.0.0.1:8000/";
export async function login(data) {
  // console.log("reached in login fun");
  const req = await fetch(`${BASE_URL}user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Specify content type as JSON
    },
    // body: JSON.stringify({
    //   email: "gamapy89@gmail.com",
    //   password: "1111",
    // }),
    body: JSON.stringify(data),
  });
  const res = await req.json();
  if (res.status === "fail") {
    throw new Error(res.message);
  }
  // console.log(
  //   "boi this is what login  function 😎😎😎😎😎😎",
  //   // id,
  //   res
  // );
  return res;
}
