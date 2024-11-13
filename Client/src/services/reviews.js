// const BASE_URL = "http://127.0.0.1:8000/";
const BASE_URL = "https://bluehorizondeploy.onrender.com/";
export const getAllReviewsOnAttraction = async function (
  cityId,
  attractionId,
  token
) {
  // console.log(
  //   "we a seacring for reviews noe+++++++++++++",
  //   cityId,
  //   attractionId,
  //   token
  // );
  if (!cityId || !attractionId || !token) {
    return console.log("we retured  eary to find all review on attraction ");
  }

  const res = await fetch(
    // `${BASE_URL}reviews/city/65d23741ee7e47c057b4cdf6/attraction/65cdfa6326201cc9901dbe37?token=${tokeni}`
    `${BASE_URL}reviews/city/${cityId}/attraction/${attractionId}?token=${token}`
  );
  const data = await res.json();
  // console.log(
  //   "this is what we got from the res data of asking all reviews ",
  //   data?.data?.reviews
  // );
  return data?.data?.reviews;
};
export const createAReviewOnAttraction = async function (
  cityId,
  attractionId,
  content,
  token
) {
  // console.log(
  //   "were are in creating review service:))1",
  //   cityId,
  //   attractionId,
  //   content
  // );
  //   return [];
  const req = await fetch(
    // `${BASE_URL}reviews/city/65d23741ee7e47c057b4cdf6/attraction/65d23a82ee7e47c057b4ce12?token=${token}`,
    `${BASE_URL}reviews/city/${cityId}/attraction/${attractionId}?token=${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    }
  );
  const res = await req.json();
  // console.log("this is what we are returnig from create review services", res);
  return res;
};
export const deleteAreview = async function (reviewId, token) {
  // console.log("were are in servives of deleted a review");
  if (!reviewId) {
    // console.log(
    //   "the reviewiid was not found in the deleting reveiws service",
    //   reviewId
    // );
    throw new Error("no review id was provided");
  }
  const req = await fetch(`${BASE_URL}reviews/${reviewId}?token=${token}`, {
    method: "DELETE",
  });
  const res = await req.json();
  if (res.status == "fail") {
    throw new Error(res.message);
  }
  // console.log("this is what i got from deleteing  the review ", res);
  return res;
};

export const updateAreview = async function (reviewId, content, token) {
  // console.log("were are in servives of deleted a review");
  if (!reviewId || !token || !content) {
    // console.log(
    //   "the reviewiid was not found in the deleting reveiws service",
    //   reviewId,
    //   content,
    //   token
    // );
    throw new Error("no review id was provided");
  }
  const req = await fetch(`${BASE_URL}reviews/${reviewId}?token=${token}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });
  const res = await req.json();
  if (res.status == "fail") {
    throw new Error(res.message);
  }
  // console.log("this is what i got from deleteing  the review ", res);
  return res;
};
// export async function findMyReviews(token) {
//   console.log(" we are in services of finding my reviews ");
//   const req = await fetch(`${BASE_URL}reviews/myreviews?token=${token}`);
//   const res = await req.json();
//   console.log(
//     "this is what we are returning from find my reviews  services",
//     res
//   );
//   return res;
// }
export async function findMyReviews(token, page) {
  // console.log("we are in services of finding my reviews");
  const req = await fetch(
    `${BASE_URL}reviews/myreviews?token=${token}&page=${page}`
  );
  const res = await req.json();
  // console.log(
  //   "this is what we are returning from find my reviews services",
  //   res
  // );
  return res;
}
