import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { findMyFavs } from "../services/favs";

export function useFindMyFavs() {
  const token = useSelector((state) => state.user.token);
  const { data, error, isLoading } = useQuery({
    queryKey: ["findMyfavs"],
    queryFn: async () => await findMyFavs(token),
  });
  return { data, error, isLoading };
}
// import { findMyFavs } from "../services/favorites"; // Ensure correct import
// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { useSelector } from "react-redux";

// export function useFindMyFavs(page = 1) {
//   const token = useSelector((state) => state.user.token);

//   const { data, error, isLoading } = useQuery(
//     ["findMyFavs", page], // Use page as part of the query key
//     async () => await findMyFavs(token, page), // Pass page to the service
//     {
//       keepPreviousData: true, // Keep previous data while new data is loading
//     }
//   );

//   return { data, error, isLoading };
// }
