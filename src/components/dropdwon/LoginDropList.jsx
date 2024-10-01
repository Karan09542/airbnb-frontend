import React, { useEffect, useState } from "react";
import { useLoginStore, useUserStore } from "../../../store/credentialStore";
import { Link } from "react-router-dom";

function LoginDropList() {
  const setIsLogin = useLoginStore((state) => state.setIsLogin);
  const [hasProperty, setHasProperty] = useState(false);
  const setUser = useUserStore((state) => state.setUser);

  function handleLogout() {
    fetch(`/user/logout`)
      .then((res) => res.json())
      .then(() => {
        setIsLogin(false);
        setUser({});
      });
  }
  useEffect(() => {
    fetch(`/hotel/dashboard`)
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
