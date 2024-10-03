import React from "react";
import NavMiddle from "./NavMiddle";
import airbnb from "../assets/airbnb.png";
import browse from "../assets/browse.svg";
import Hamburger from "./Hamburger";
import { Link } from "react-router-dom";
import { useNavMiddleStore } from "../../store/credentialStore";

function Navbar({ className }) {
  const isNavMiddle = useNavMiddleStore((state) => state.isNavMiddle);

  return (
    <>
      <div
        className={`flex w-[95%] text-sm mx-auto items-center justify-between px-4 py-3 ${
          className ? className : ""
        }`}
        style={{ color: "var(--light-gray)" }}
      >
        <div className="flex items-center">
          <Link to="/">
            <img
              src={airbnb}
              width={101}
              style={{ filter: "contrast(200%)" }}
              alt="airbnb"
              className="cursor-pointer"
              onClick={() => window.scrollTo(0, 0)}
            />
          </Link>
        </div>
        {isNavMiddle && <NavMiddle />}

        <div className="flex items-center">
          {isNavMiddle && (
            <span className="font-bold text-nowra hover:bg-[var(--general-hover)] relative z-10 back cursor-pointer">
              <Link to="/host/homes">Airbnb your home</Link>
            </span>
          )}
          <img src={browse} alt="browse" className="mx-4 cursor-pointer" />
          <Hamburger />
        </div>
      </div>
    </>
  );
}

export default Navbar;
