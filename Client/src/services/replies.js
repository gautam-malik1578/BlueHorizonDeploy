const BASE_URL = "http://127.0.0.1:8000/";
export async function findRepliesOnAReview(reviewId, token) {
  console.log(
    "we are in find  replies services with values--->>",
    reviewId,
    token
  );
  const req = await fetch(
    `${BASE_URL}replies/review/${reviewId}?token=${token}`
  );
  const res = await req.json();
  console.log("this is what we are returning from find replies --", res);
  return res;
}
export async function createReplieOnReview(reviewId, content, token) {
  console.log(
    "we are in create replies services with values--->>",
    reviewId,
    content,
    token
  );
  const req = await fetch(
    `${BASE_URL}replies/review/${reviewId}?token=${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    }
  );
  const res = await req.json();
  console.log("this is what we are returning from creating replies --", res);
  return res;
}
export async function updateReplyOnReview(reviewId, replyId, content, token) {
  console.log(
    "we are in updating reply services with values--->>",
    reviewId,
    replyId,
    content,
    token
  );
  const req = await fetch(
    `${BASE_URL}replies/review/${reviewId}/reply/${replyId}?token=${token}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    }
  );
  const res = await req.json();
  console.log("this is what we are returning from updating replies --", res);
  return res;
}
export async function deleteRepliyOnReview(reviewId, replyId, token) {
  console.log(
    "we are in deleting  reply services with values--->>",
    reviewId,
    replyId,
    token
  );
  const req = await fetch(
    `${BASE_URL}replies/review/${reviewId}/reply/${replyId}?token=${token}`,
    {
      method: "DELETE",
    }
  );
  const res = await req.json();
  console.log("this is what we are returning from deleting replies --", res);
  return res;
}
