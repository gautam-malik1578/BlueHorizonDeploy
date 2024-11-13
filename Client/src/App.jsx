// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import SignUp from "./pages/Signup";
// import Me from "./pages/Me";
// import Dashboard from "./pages/Dashboard";
// import Travel from "./pages/Travel";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./AppLayout";
// import "./App.css";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { Toaster } from "react-hot-toast";
// import ReviewsPage from "./pages/ReviewsPage";
// import CityDetails from "./components/cityDetails";
// import Map from "./components/Map";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Verify from "./pages/Verify";
// import CityList from "./components/CityList";
// const queryClient = new QueryClient({
//   defaultOptions: { queries: { staleTime: 60 * 1000 } },
// });

// function App() {
//   const isDarkMode = useSelector((state) => state.setting.isDarkMode);
//   return (
//     <QueryClientProvider client={queryClient}>
//       <ReactQueryDevtools initialIsOpen={false} />
//       <div className={`app app-${isDarkMode ? "b" : "w"}`}>
//         <BrowserRouter>
//           <Routes>
//             <Route element={<AppLayout />}>
//               <Route
//                 path="/"
//                 element={<ProtectedRoute element={<Dashboard />} />}
//               />
//               <Route
//                 path="/dashboard/:show"
//                 element={<ProtectedRoute element={<Dashboard />} />}
//               />
//               <Route
//                 path="/travel"
//                 element={<ProtectedRoute element={<Travel />} />}
//               >
//                 <Route
//                   path="search"
//                   element={<ProtectedRoute element={<CityList />} />}
//                 />
//                 <Route
//                   path="citydetail/:cityId"
//                   element={<ProtectedRoute element={<CityDetails />} />}
//                 />
//                 <Route
//                   path="map"
//                   element={<ProtectedRoute element={<Map />} />}
//                 />
//               </Route>
//               <Route
//                 path="/attraction/:attrationName/:attractionId/reviews"
//                 element={<ProtectedRoute element={<ReviewsPage />} />}
//               />
//             </Route>
//             <Route path="/login" element={<Login />} />
//             <Route path="/verify" element={<Verify />} />
//             <Route path="/signup" element={<SignUp />} />
//             <Route path="/me" element={<ProtectedRoute element={<Me />} />} />
//             <Route path="*" element={<PageNotFound />} />
//           </Routes>
//         </BrowserRouter>
//         <Toaster
//           position="top-center"
//           gutter={12}
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
/////////////////////////////////////this is t eh code we should have below ///////////////////
import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./AppLayout";
import Loader from "./components/Loader";
import "./App.css";

// Create the query client
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 1000 } },
});

// Use React.lazy to load components lazily
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const SignUp = React.lazy(() => import("./pages/Signup"));
const Me = React.lazy(() => import("./pages/Me"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Travel = React.lazy(() => import("./pages/Travel"));
const PageNotFound = React.lazy(() => import("./pages/PageNotFound"));
const ReviewsPage = React.lazy(() => import("./pages/ReviewsPage"));
const CityDetails = React.lazy(() => import("./components/cityDetails"));
const Map = React.lazy(() => import("./components/Map"));
const Verify = React.lazy(() => import("./pages/Verify"));
const CityList = React.lazy(() => import("./components/CityList"));

function App() {
  const isDarkMode = useSelector((state) => state.setting.isDarkMode);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div className={`app app-${isDarkMode ? "b" : "w"}`}>
        <BrowserRouter>
          {/* Wrap Routes with Suspense and show a fallback loader */}
          <Suspense fallback={<Loader text="Loading..." />}>
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
          </Suspense>
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
