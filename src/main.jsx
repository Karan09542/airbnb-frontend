import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage, NotFoundPage } from "./components/Error.jsx";
import CheckLogin from "./components/CheckLogin.jsx";
import Reservation from "./components/reservation/Reservation.jsx";
import AirbnbYHome from "./components/AirbnbYHome/AirbnbYHome.jsx";
import MyProperties from "./components/AirbnbYHome/MyProperties.jsx";
import Trips from "./components/trips/Trips.jsx";
import ManageReservation from "./components/reservation/ManageReservation.jsx";
import Favorite from "./components/favorites/Favorite.jsx";
import SearchHotel from "./components/searchHotel/SearchHotel.jsx";
import RangeSlider from "./components/RangeSilder/RangeSlider.jsx";
import ResetPassword from "./components/ResetPassword/ResetPassword.jsx";
import VerifyEmail from "./components/VerifyEmail/VerifyEmail.jsx";
import Room from "./components/room/Room.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <CheckLogin>
        <App />
      </CheckLogin>
    ),
  },
  {
    path: "/Not_Found",
    element: <ErrorPage />,
  },
  {
    path: "/help",
    element: <NotFoundPage />,
  },
  {
    path: "/rooms/:hotelId",
    element: (
      <CheckLogin>
        <Room />
      </CheckLogin>
    ),
  },
  {
    path: "/trips",
    element: (
      <>
        <CheckLogin />
        <Trips />
      </>
    ),
  },
  {
    path: "/reservation",
    element: (
      <>
        <CheckLogin /> <Reservation />
      </>
    ),
  },
  {
    path: "/host/homes",
    element: (
      <>
        <CheckLogin /> <AirbnbYHome />
      </>
    ),
  },
  {
    path: "/property",
    element: (
      <>
        <CheckLogin />
        <MyProperties />
      </>
    ),
  },
  {
    path: "/ManageReservations",
    element: (
      <>
        <CheckLogin />
        <ManageReservation />
      </>
    ),
  },
  {
    path: "/favorite",
    element: (
      <>
        <CheckLogin />
        <Favorite />
      </>
    ),
  },
  {
    path: "/s/:searchText",
    element: (
      <>
        <CheckLogin />
        <SearchHotel />
        <RangeSlider />
      </>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <>
        <ResetPassword />
      </>
    ),
  },
  {
    path: "/verify-email",
    element: (
      <>
        <VerifyEmail />
      </>
    ),
  },
  1,
]);

const clientId =
  "521185638404-iaik643vgesq0qvvep3v50dg96q0keki.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={clientId}>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
