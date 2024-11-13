// const BASE_URL = "http://127.0.0.1:8000/";
const BASE_URL = "https://bluehorizondeploy.onrender.com/";
export const getNoteonAttraction = async function (
  cityId,
  attractionId,
  token
) {
  console.log("boi we are in finding notes on a attraction ::))");
  if (!cityId || !attractionId || !token) {
    // return console.log(
    //   "returen early for search a not :(((((",
    //   cityId,
    //   attractionId,
    //   token
    // );
  }
  const res = await fetch(
    // `${BASE_URL}reviews/city/65d23741ee7e47c057b4cdf6/attraction/65cdfa6326201cc9901dbe37?token=${tokeni}`
    `${BASE_URL}notes/city/${cityId}/attraction/${attractionId}?token=${token}`
  );
  const data = await res.json();
  // console.log(
  //   "this is what we got from the res data of asking the note on a city ",
  //   data?.data?.note
  // );
  return data?.data?.note;
};
export const createANoteOnAttraction = async function (
  cityId,
  attractionId,
  content,
  token
) {
  // console.log(
  //   "were are in creating note service:))1",
  //   cityId,
  //   attractionId,
  //   content
  // );
  //   return [];
  const req = await fetch(
    // `${BASE_URL}reviews/city/65d23741ee7e47c057b4cdf6/attraction/65d23a82ee7e47c057b4ce12?token=${token}`,
    `${BASE_URL}notes/city/${cityId}/attraction/${attractionId}?token=${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    }
  );
  const res = await req.json();
  // console.log("this is what we are returnig from create note services", res);
  return res;
};
export const updateANote = async function (noteId, content, action, token) {
  // console.log("were are in servives of updating a note");
  if (!noteId || !token) {
    // console.log(
    //   "the reviewiid was not found in the updating note service",
    //   noteId,
    //   content,
    //   action,
    //   token
    // );
    throw new Error("no review id was provided");
  }
  let req;
  if (action === "update") {
    req = await fetch(`${BASE_URL}notes/note/${noteId}?token=${token}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });
  } else {
    req = await fetch(`${BASE_URL}notes/note/${noteId}?token=${token}`, {
      method: "DELETE",
    });
  }
  const res = await req.json();
  if (res.status == "fail") {
    throw new Error(res.message);
  }
  // console.log("this is what i got from deleteing or updating  a note ", res);
  return res;
};
