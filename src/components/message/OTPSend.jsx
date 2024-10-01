import React from "react";
import { useOpenModalStore, useOTP } from "../../../store/credentialStore";
import { RxCross2 } from "react-icons/rx";

function OTPSend() {
  const otp = useOTP((state) => state.otp);
  const setOpenModel = useOpenModalStore((state) => state.setOpenModel);
  return (
    <div className="fixed z-20 w-full h-full bg-black/40">
      <div className="absolute max-w-md pb-6 text-center -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-lg shadow-md pointer-events-auto left-1/2 top-1/2">
        <RxCross2
          className="hover:bg-[var(--general-hover)] active:scale-95 p-[0.5rem] rounded-full"
          onClick={() => setOpenModel(null)}
          size={32}
        />
        <hr />
        <p className="p-6 text-rose-500">
          You're sent an email please check your "inbox" and open the link and
          Enter below <br /> OTP{" "}
        </p>
        {otp && (
          <p className="px-5 py-2 mx-auto text-xl tracking-wider border w-fit">
            {otp}
          </p>
        )}
      </div>
    </div>
  );
}

export default OTPSend;
