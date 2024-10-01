import React, { useEffect, useRef, useState } from "react";
import UserLogo from "../assets/user_logo.svg?react";
import hamburger from "../assets/hamburger.svg";
import Dropdown from "./dropdwon/Dropdown";
import DropListInit from "./dropdwon/DropListInit";
import useOutsideClose from "../hooks/useOutsideClose";
import LoginDropList from "./dropdwon/LoginDropList";
import {
  useLoginStore,
  useShouldFetchUserStore,
  useUserStore,
} from "../../store/credentialStore";

function Hamburger() {
  const [show, setShow] = useState(false);
  const dropRef = useRef(null);
  useOutsideClose({ setState: setShow, reference: dropRef, arg: false });
  const isLogin = useLoginStore((state) => state.isLogin);
  const user = useUserStore((state) => state.user);
  const setShouldFetchUser = useShouldFetchUserStore(
    (state) => state.setShouldFetchUser
  );

  useEffect(() => {
    setShouldFetchUser();
    console.log("सीताराम");
  }, []);
  return (
    <div
      className="btn relative flex gap-3 text-[1.1em] hover:shadow-md cursor-pointer"
      onClick={() => setShow(!show)}
      ref={dropRef}
      aria-expanded={show}
    >
      <img src={hamburger} alt="|| hrozontal line" />

      {user?.image && isLogin ? (
        <img
          src={user?.image}
          className="rounded-full w-[32px] aspect-square"
        ></img>
      ) : (
        <UserLogo style={{ fill: isLogin ? "#F43F5E" : "#676767" }} />
      )}
      {show && (
        <Dropdown
          className={`${
            isLogin
              ? "loginshadow [&>li:nth-child(n)]:cursor-pointer hover:[&>li:nth-child(n)]:bg-red-50 [&>li:nth-child(n)]:rounded-lg [&>li:nth-child(n)]:px-1 [&>li:nth-last-child(3)]:mb-2 [&>li:last-child]:mt-3"
              : "dropshadow hover:[&>li:nth-child(n)]:bg-red-50 [&>li:nth-child(n)]:px-2 [&>li:nth-child(n)]:rounded-lg"
          } z-10`}
        >
          {isLogin ? <LoginDropList /> : <DropListInit />}
        </Dropdown>
      )}
    </div>
  );
}
export default Hamburger;
