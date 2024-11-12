const BASE_URL = "http://127.0.0.1:8000/";
export async function handleLike(attractionId, token) {
  // console.log("we entered in the likes services");
  const req = await fetch(
    `${BASE_URL}attractions/like/${attractionId}?token=${token}`,
    {
      method: "PATCH",
    }
  );
  const res = await req.json();
  // console.log("this is what we are returning from the like services", res);
  return res;
}
export async function findMyLikedAttraction(token) {
  // console.log(" we are in services of finding my liked attraction");
  const req = await fetch(`${BASE_URL}likes/me?token=${token}`);
  const res = await req.json();
  // console.log(
  //   "this is what we are returning from find my liked attractions like services",
  //   res
  // );
  return res;
}
// export async function findMyLikedAttraction(token, page) {
//   console.log("we are in services of finding my liked attraction");
//   const req = await fetch(`${BASE_URL}likes/me?token=${token}&page=${page}`);
//   const res = await req.json();
//   console.log(
//     "this is what we are returning from find my liked attractions like services",
//     res
//   );
//   return res;
// }
// this is to be ingmore ////////
// import { useState } from "react";
// import { useFindMyLikes } from "../hooks/useFindMyLikes"; // Ensure correct import
// import AttractionItem from "./AttractionItem";
// import styles from "./Liked.module.css";
// import Loader from "./Loader";
// import NotFound from "./NotFound";

// function Liked() {
//   const [currentPage, setCurrentPage] = useState(1); // State for current page
//   const { data, error, isLoading } = useFindMyLikes(currentPage); // Pass currentPage to hook

//   const len = data?.data?.likedAttractions[0]?.attractionsIds?.length; // Length of attractions

//   if (isLoading) {
//     return <Loader />;
//   }

//   if (len === 0) {
//     return <NotFound text="No liked Attraction Yet :(" />;
//   }

//   const totalLikes = data.pagination.totalLikes;
//   const totalPages = data.pagination.totalPages;

//   // Handle page change
//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   return (
//     <div style={{ backgroundColor: "white" }} className={styles.liked}>
//       {len && (
//         <h1 className={styles.head}>
//           {`We found ${totalLikes} attractions liked by you`}
//         </h1>
//       )}

//       {data?.data?.likedAttractions[0]?.attractionsIds.map((attraction) => (
//         <AttractionItem
//           key={attraction._id}
//           type="like"
//           attraction={attraction}
//         />
//       ))}

//       {/* Pagination Controls */}
//       <div className={styles.pagination}>
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1} //we should not go lower than this
//         >
//           Back
//         </button>
//         <span>{`Page ${currentPage} of ${totalPages}`}</span>
//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages} // we should not go higher than this
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Liked;
