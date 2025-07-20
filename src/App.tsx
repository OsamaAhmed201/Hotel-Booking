import { Suspense } from "react";
import Landing from "./modules/pages/User/Landing/Landing";
import NotFound from "./modules/shared/NotFound/NotFound";
import ProtectedRoute from "./modules/shared/ProtectedRoute/ProtectedRoute";
import MasterLayout from "./modules/layouts/MasterLayout.css/MasterLayout";
import ChangePassword from "./modules/auth/ChangePassword/ChangePassword";
import ForgetPassword from "./modules/auth/ForgetPassword/ForgetPassword";
import Register from "./modules/auth/Register/Register";
import Login from "./modules/auth/Login/Login";
import AuthLayout from "./modules/layouts/AuthLayout/AuthLayout";
import { lazy } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import ResetPassword from "./modules/auth/ResetPassword/ResetPassword";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@mui/material";
import { theme } from "./modules/services/Theme";
import { useThemeContext } from "./contexts/ThemeContext";
import { DashboardHome } from "./modules/pages/Admin/Dashboard/Dashboard/Dashboard";
import Explore from "./modules/pages/User/Explore/Explore";
import Favorites from "./modules/pages/User/Favorites/Favorites";
import Details from "./modules/pages/User/Details/Details";
import UserLayout from "./modules/layouts/UserLayout/UserLayout";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
const Ads = lazy(
  () => import("./modules/pages/Admin/Dashboard/Ads/AdsList/Ads")
);
const Facilities = lazy(
  () =>
    import(
      "./modules/pages/Admin/Dashboard/Facilities/FacilitesList/Facilities"
    )
);
const Bookings = lazy(
  () => import("./modules/pages/Admin/Dashboard/Bookings/BookingList/Bookings")
);
const Rooms = lazy(
  () => import("./modules/pages/Admin/Dashboard/Rooms/RoomsList/Rooms")
);
const Users = lazy(
  () => import("./modules/pages/Admin/Dashboard/Users/UsersList/Users")
);
const RoomData = lazy(
  () => import("./modules/pages/Admin/Dashboard/Rooms/RoomsData/RoomData")
);
const BookingData = lazy(
  () =>
    import(
      "./modules/pages/Admin/Dashboard/Bookings/ViewBookingModal/ViewBookingModal"
    )
);
const FacilitesData = lazy(
  () =>
    import(
      "./modules/pages/Admin/Dashboard/Facilities/FacilitesData/FacilitesData"
    )
);
const AdData = lazy(
  () => import("./modules/pages/Admin/Dashboard/Ads/AdData/AdData")
);
const UsersUpdate = lazy(
  () => import("./modules/pages/Admin/Dashboard/Users/UsersUpdate/UsersUpdate")
);
import { LocalizationProvider } from "@mui/x-date-pickers";
import ProtectedUserRoute from "./modules/shared/ProtectedRoute/ProtectedUserRoute";
import Payment from "./modules/pages/User/Landing/components/Payment";
import PaymentSuccess from "./modules/pages/User/Landing/components/PaymentSuccess ";
import MyBookings from "./modules/pages/User/My Bookings/MyBookings";



function App() {
  const routes: RouteObject[] = [
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "change-password", element: <ChangePassword /> },
        {
          path: "user-profile",
          element: (
            <Suspense fallback={null}>
              <UsersUpdate />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={null}>
              <DashboardHome />
            </Suspense>
          ),
        },
        {
          path: "users",
          element: (
            <Suspense fallback={null}>
              <Users />
            </Suspense>
          ),
        },

        {
          path: "rooms",
          element: (
            <Suspense fallback={null}>
              <Rooms />
            </Suspense>
          ),
        },
        {
          path: "bookings",
          element: (
            <Suspense fallback={null}>
              <Bookings />
            </Suspense>
          ),
        },
        {
          path: "facilities",
          element: (
            <Suspense fallback={null}>
              <Facilities />
            </Suspense>
          ),
        },
        {
          path: "ads",
          element: (
            <Suspense fallback={null}>
              <Ads />
            </Suspense>
          ),
        },

        {
          path: "rooms-data",
          element: (
            <Suspense fallback={null}>
              <RoomData />
            </Suspense>
          ),
        },
        {
          path: "bookings-data",
          element: (
            <Suspense fallback={null}>
              <BookingData />
            </Suspense>
          ),
        },
        {
          path: "facilities-data",
          element: (
            <Suspense fallback={null}>
              <FacilitesData />
            </Suspense>
          ),
        },
        {
          path: "ads-data",
          element: (
            <Suspense fallback={null}>
              <AdData />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/",
      element: <ProtectedUserRoute><UserLayout /></ProtectedUserRoute> ,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={null}>
              <Landing />
            </Suspense>
          ),
        },

        {
          path: "landing",
          element: (
            <Suspense fallback={null}>
              <Landing />
            </Suspense>
          ),
        },

        {
          path: "Explore",
          element: (
            <Suspense fallback={null}>
              <Explore />
            </Suspense>
          ),
        },
         {
          path: "/payment",
          element: (
            <Suspense fallback={null}>
              <Payment />
            </Suspense>
          ),
        },
        {
          path: "Favorites",
          element: (
            <Suspense fallback={null}>
              <ProtectedUserRoute>
                <Favorites />
              </ProtectedUserRoute>
            </Suspense>
          ),
        },
        {
          path: "my-bookings",
          element: (
            <Suspense fallback={null}>
              <ProtectedUserRoute>
                <MyBookings />
              </ProtectedUserRoute>
            </Suspense>
          ),
        },
         {
          path: "payment-success",
          element: (
            <Suspense fallback={null}>
              <ProtectedUserRoute>
            <PaymentSuccess />
              </ProtectedUserRoute>
            </Suspense>
          ),
        },
        {
          path: "details/:id",
          element: (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Suspense fallback={null}>
              <Details />
            </Suspense>
            </LocalizationProvider>
          ),
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ];

  const { darkMode } = useThemeContext();

  return (
    <ThemeProvider theme={theme(darkMode)}>
      <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={createBrowserRouter(routes)} />
    </ThemeProvider>
  );
}

export default App;
