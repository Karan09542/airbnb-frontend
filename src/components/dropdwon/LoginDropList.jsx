import React, { useEffect, useState } from "react";
import {
  useAccessTokenStore,
  useBaseURL,
  useLoginStore,
  useUserStore,
} from "../../../store/credentialStore";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function LoginDropList() {
  const setIsLogin = useLoginStore((state) => state.setIsLogin);
  const [hasProperty, setHasProperty] = useState(false);
  const setUser = useUserStore((state) => state.setUser);

  const baseURL = useBaseURL((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const setAccessToken = useAccessTokenStore((state) => state.setAccessToken);

  async function handleLogout() {
    await fetch(`${baseURL}/user/logout`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setIsLogin(false);
          setUser({});
          setAccessToken("");
          toast.success("Logout successfull");
        } else {
          toast.error("Logout unsuccessful");
        }
      });
  }
  useEffect(() => {
    fetch(`${baseURL}/hotel/dashboard`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setHasProperty(true);
        }
        if (res.status === 403) {
          setHasProperty(false);
        }
      })
      .catch((err) => {
        console.log("Error fetching dashboard data:", err);
      });
  }, []);

  return (
    <>
      <li>
        <Link to="/trips">My trips</Link>
      </li>
      <li>
        <Link to="/favorite">My favorites</Link>
      </li>
      <li>
        <Link to="/reservation">My reservations</Link>
      </li>
      {hasProperty && (
        <li>
          <Link to="/property">My properties</Link>
        </li>
      )}
      {hasProperty && (
        <li>
          <Link to="/ManageReservations">Manage reserva..</Link>
        </li>
      )}

      <li>
        <Link to="/host/homes">Airbnb my home</Link>
      </li>

      <hr className="absolute left-0 w-full" />
      <li onClick={handleLogout}>Logout</li>
    </>
  );
}

export default LoginDropList;
