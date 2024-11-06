import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Me from "./pages/Me";
import Dashboard from "./pages/Dashboard";
import Travel from "./pages/Travel";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./AppLayout";
import "./App.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import ReviewsPage from "./pages/ReviewsPage";
import CityDetails from "./components/cityDetails";
import Map from "./components/Map";
import CityList from "./components/CityList";
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 1000 } },
});
// function App() {
//   const isDarkMode = useSelector((state) => state.setting.isDarkMode);
//   return (
//     <QueryClientProvider client={queryClient}>
//       <ReactQueryDevtools initialIsOpen={false} />
//       <div className={`app app-${isDarkMode ? "b" : "w"}`}>
//         <BrowserRouter>
//           <Routes>
//             <Route element={<AppLayout />}>
//               <Route path="/" element={<Login />} />
//               <Route path="/dashboard/:show" element={<Dashboard />} />
//               <Route path="/travel" element={<Travel />}>
//                 <Route path="search" element={<CityList />} />
//                 <Route path="citydetail/:cityId" element={<CityDetails />} />
//                 <Route path="map" element={<Map />} />
//               </Route>
//               <Route
//                 path="/attraction/:attrationName/:attractionId/reviews"
//                 element={<ReviewsPage />}
//               />
//             </Route>
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<SignUp />} />
//             <Route path="/me" element={<Me />} />
//             {/* <Route
//               path="/attraction/:attrationName/:attractionId/reviews"
//               element={<ReviewsPage />}
//             /> */}
//             <Route path="*" element={<PageNotFound />} />
//           </Routes>
//         </BrowserRouter>
//         <Toaster
//           // position="top-center"
//           position="top-center"
//           gutter={12}
//           containerStyle={{ margin: "0px", translate: "-10px" }}
//           toastOptions={{
//             success: { duration: 1500 },
//             error: { duration: 3000 },
//             style: {
//               fontSize: "14px",
//               maxWidth: "500px",
//               padding: "8px 16px",
//               backgroundColor: "var(--color-white)",
//               color: "var(--color-blue)",
//             },
//           }}
//         />
//       </div>
//     </QueryClientProvider>
//   );
// }

// export default App;
/////////////////////////////////////////////
import ProtectedRoute from "./components/ProtectedRoute";
import Verify from "./pages/Verify";

function App() {
  const isDarkMode = useSelector((state) => state.setting.isDarkMode);
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div className={`app app-${isDarkMode ? "b" : "w"}`}>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route
                path="/"
                element={<ProtectedRoute element={<Dashboard />} />}
              />
              <Route
                path="/dashboard/:show"
                element={<ProtectedRoute element={<Dashboard />} />}
              />
              <Route
                path="/travel"
                element={<ProtectedRoute element={<Travel />} />}
              >
                <Route
                  path="search"
                  element={<ProtectedRoute element={<CityList />} />}
                />
                <Route
                  path="citydetail/:cityId"
                  element={<ProtectedRoute element={<CityDetails />} />}
                />
                <Route
                  path="map"
                  element={<ProtectedRoute element={<Map />} />}
                />
              </Route>
              <Route
                path="/attraction/:attrationName/:attractionId/reviews"
                element={<ProtectedRoute element={<ReviewsPage />} />}
              />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/me" element={<ProtectedRoute element={<Me />} />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          toastOptions={{
            success: { duration: 1500 },
            error: { duration: 3000 },
            style: {
              fontSize: "14px",
              maxWidth: "500px",
              padding: "8px 16px",
              backgroundColor: "var(--color-white)",
              color: "var(--color-blue)",
            },
          }}
        />
      </div>
    </QueryClientProvider>
  );
}

export default App;
