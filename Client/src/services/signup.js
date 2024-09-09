const BASE_URL = "http://127.0.0.1:8000/";
export async function signup(dataObj) {
  console.log("we are in the sign up services with data as === ", dataObj);
  if (dataObj.length === 0) {
    throw new Error("the data obj was empty");
  }
  const req = await fetch(`${BASE_URL}user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataObj),
  });
  const res = await req.json();
  if (res.status === "fail") {
    // console.log("we are in res.status===fail block");
    throw new Error(res.message);
  }
  console.log("this is waht we are returning from the signup services", res);
  return res;
}
