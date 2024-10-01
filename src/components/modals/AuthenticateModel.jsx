import React from "react";
import { useOpenModalStore } from "../../../store/credentialStore";
import { ToastContainer } from "react-toastify";
import Login from "./Login";
import Sign_toEmail from "./Sign_toEmail";
import SignUp from "./SignUp";
import EmailSent from "../message/EmailSent";
import OTPSend from "../message/OTPSend";

function AuthenticateModel() {
  const openModel = useOpenModalStore((state) => state.openModel);

  return (
    <>
      {openModel === "signUpPage" && <SignUp />}
      {openModel === "signToEmail" && <Sign_toEmail />}
      {openModel === "login" && <Login />}
      {openModel === "emailSentModel" && <EmailSent />}
      {openModel === "otp" && <OTPSend />}
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
    </>
  );
}

export default AuthenticateModel;
