import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { CgSpinner } from "react-icons/cg";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Validity from "../Validity";
import { useBaseURL, useLoginStore } from "../../../store/credentialStore";
import { toast, ToastContainer } from "react-toastify";

function VerifyEmail() {
  const [otp, setOtp] = useState(0);
  const params = useParams();
  const [isSpinning, setIsSpinning] = useState(false);
  const [isCorrect, setIsCorrect] = useState(true);
  const baseURL = useBaseURL((state) => state.baseURL);
  const [search] = useSearchParams();
  const setIsLogin = useLoginStore((state) => state.setIsLogin);
  const navigate = useNavigate();

  const handleVarify = async () => {
    setIsSpinning(true);
    if (otp.length !== 6 || otp.length === undefined) {
      setIsCorrect(false);
      setIsSpinning(false);
      return;
    }

    await fetch(`${baseURL}/user/verify_email`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ token: search.get("resetToken"), otp }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success(data.message);
          setIsLogin(true);
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          toast.error(data.message);
          setIsLogin(false);
        }
      })
      .finally(() => setIsSpinning(false));
    setIsCorrect(false);
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
      <div className="absolute flex items-center justify-center w-full h-full gap-3 m-auto">
        <div className="p-5 rounded-md reserve-shadow w-96 [&>*:nth-child(n)]:mb-2">
          <div className="font-medium text-stone-700">Verify Email</div>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>&nbsp;&nbsp;</span>}
            renderInput={(props) => (
              <input
                {...props}
                className="border rounded min-w-9 aspect-square"
              />
            )}
          />
          {!isCorrect && <Validity message={"fill above otp correctly"} />}
          <div
            className="flex items-center gap-2 px-2 py-1 mt-3 text-white bg-green-400 rounded-md w-fit"
            onClick={handleVarify}
          >
            {isSpinning && <CgSpinner className="animate-spin" />}
            <button className="">verify</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default VerifyEmail;
