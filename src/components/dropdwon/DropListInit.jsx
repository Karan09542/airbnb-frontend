import React from "react";
import { Link } from "react-router-dom";
import { useOpenModalStore } from "../../../store/credentialStore";

function DropList() {
  const setOpenModel = useOpenModalStore((state) => state.setOpenModel);
  return (
    // css in index.css line 32 with its parent
    <>
      <li onClick={() => setOpenModel("signUpPage")}>Sign up</li>
      <li onClick={() => setOpenModel("login")}>Login</li>
      <hr className="absolute left-0 w-full" />
      <li>
        <Link to="/host/homes">Airbnb your home</Link>
      </li>
      <li>
        <Link to="/help">Help Center</Link>
      </li>
    </>
  );
}

export default DropList;
