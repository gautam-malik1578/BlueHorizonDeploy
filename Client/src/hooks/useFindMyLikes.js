import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { findMyLikedAttraction } from "../services/likes";

export function useFindMyLikes() {
  const token = useSelector((state) => state.user.token);
  const { data, error, isLoading } = useQuery({
    queryKey: ["findMyLikes"],
    queryFn: async () => await findMyLikedAttraction(token),
  });
  return { data, error, isLoading };
}
// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { useSelector } from "react-redux";
// import { findMyLikedAttraction } from "../services/likes"; // Ensure correct import

// export function useFindMyLikes(page = 1) {
//   const token = useSelector((state) => state.user.token);

//   const { data, error, isLoading } = useQuery(
//     ["findMyLikes", page], // Use page as part of the query key
//     async () => await findMyLikedAttraction(token, page), // Pass page to the service
//     {
//       keepPreviousData: true, // Retain previous data while new data is loading
//     }
//   );

//   return { data, error, isLoading };
// }
