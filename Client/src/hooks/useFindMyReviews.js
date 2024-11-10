// import { useQuery } from "@tanstack/react-query";
// import { useSelector } from "react-redux";
// import { findMyReviews } from "../services/reviews";

// export function useFindMyReviews() {
//   const token = useSelector((state) => state.user.token);
//   const { data, error, isLoading } = useQuery({
//     queryKey: ["findMyReviews"],
//     queryFn: async () => await findMyReviews(token),
//   });
//   return { data, error, isLoading };
// }
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { findMyReviews } from "../services/reviews";
// import { findMyReviews } from "../services/reviewService"; // Assuming your API logic is in reviewService.js

export function useFindMyReviews(page = 1) {
  const token = useSelector((state) => state.user.token);

  const { data, error, isLoading } = useQuery(
    ["findMyReviews", page],
    async () => await findMyReviews(token, page), // Pass page to the service
    {
      keepPreviousData: true, // Keeps previous data while new data is loading
    }
  );

  return { data, error, isLoading };
}
