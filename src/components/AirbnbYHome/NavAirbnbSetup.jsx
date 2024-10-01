import React, { useEffect, useRef, useState } from "react";
import { FaAirbnb } from "react-icons/fa";
import HomeSetupSVG from "../../assets/homeSetup.svg?react";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useOpenModalStore } from "../../../store/credentialStore";
import { toast } from "react-toastify";
import useOutsideClose from "../../hooks/useOutsideClose";

function NavAirbnbSetup() {
  const [isAgreeSetup, setIsAgreeSetup] = useState(false);
  const setOpenModel = useOpenModalStore((state) => state.setOpenModel);

  const agreeSetupBoxRef = useRef(null);
  useOutsideClose({
    setState: setIsAgreeSetup,
    reference: agreeSetupBoxRef,
    arg: false,
  });

  const handleAirbnbSetup = async () => {
    await fetch(`/user/isLogin`)
      .then((res) => res.json())
      .then((data) => {
        switch (data.status) {
          case "success": {
            setIsAgreeSetup(true);
            break;
          }
          case "fail": {
            toast.error(data.message);
            setOpenModel("login");
            break;
          }
          case 409:
            toast.error(data.message);
        }
      })
      .catch((err) => console.log(err.message));
  };
  const handleRole = async () => {
    await fetch(`/user/hostRole`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success("Setup successful");
          window.location.reload();
        } else if (data.status === "fail") {
          toast.error(data.message);
        }
      });
    setIsAgreeSetup(false);
  };

  return (
    <>
      {isAgreeSetup && (
        <div className="fixed w-full h-full bg-black/20">
          <div
            ref={agreeSetupBoxRef}
            className="fixed flex flex-col p-3 pt-5 -translate-x-1/2 -translate-y-1/2 bg-white border rounded-md pb-7 airbnb-setup-shadow left-1/2 top-1/2 w-80"
          >
            {" "}
            <div className="p-1.5 rounded-full hover:bg-stone-100 active:scale-95 w-fit">
              <RxCross2 onClick={() => setIsAgreeSetup(false)} />
            </div>
            <p className="px-1 pb-2 text-lg">Agree to setup Airbnb</p>
            <button
              className="py-2.5 text-xl font-semibold text-white bg-gradient-to-r from-[#E51D4F] to-[#D90568] rounded-lg cursor-pointer active:scale-95 select-none "
              onClick={handleRole}
            >
              Agree to setup
            </button>
          </div>
        </div>
      )}
      <div>
        <div className="max-[1450px]:px-20 flex max-[740px]:block items-center justify-between mx-auto max-w-[1275px] pt-4">
          <Link to="/">
            <FaAirbnb color="red" size={34} />
          </Link>
          <div className="flex items-center gap-5 max-[740px]:gap-3 max-[740px]:pt-1 max-[740px]:pb-3 max-[740px]:flex-col bg-white max-[740px]:shadow-[rgba(100,100,111,0.3)_0px_7px_29px_0px] max-[740px]:fixed max-[740px]:left-0 max-[740px]:bottom-0 max-[740px]:w-full max-[740px]:px-5">
            <p className="text-[1.05rem] font-medium">Ready to Airbnb it?</p>
            <div
              className="flex items-center gap-1 px-5 py-2.5 text-xl font-semibold text-white bg-gradient-to-r from-[#E51D4F] to-[#D90568] rounded-lg w-fit cursor-pointer active:scale-95 select-none max-[740px]:w-full max-[740px]:justify-center"
              onClick={handleAirbnbSetup}
            >
              <HomeSetupSVG />
              <span>Airbnb Setup</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavAirbnbSetup;
