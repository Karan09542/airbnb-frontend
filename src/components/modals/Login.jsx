import React, { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoLogoFacebook } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { SiApple } from "react-icons/si";
import { CgSpinner } from "react-icons/cg";

import Abutton from "../Abutton";
import Authfield from "../Authfield";
import useOutsideClose from "../../hooks/useOutsideClose";
import emailValidate from "email-validator";
import Validity from "../Validity";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useAccessTokenStore,
  useBaseURL,
  useFormDataStore,
  useLoginStore,
  useOpenModalStore,
} from "../../../store/credentialStore";
import { useGoogleLogin } from "@react-oauth/google";
import { useLogin } from "../../hooks/useAuthenticateWith";

function Login() {
  const formData = useFormDataStore((state) => state.formData);
  const setFormData = useFormDataStore((state) => state.setFormData);

  function handleFormData(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const setOpenModel = useOpenModalStore((state) => state.setOpenModel);

  const LoginRef = useRef(null);

  useOutsideClose({
    setState: setOpenModel,
    reference: LoginRef,
    arg: "null",
  });

  const [errors, setErrors] = useState({});
  // const { setIsLogin } = useContext(LoginContext);
  const setIsLogin = useLoginStore((state) => state.setIsLogin);
  const [isSpinning, setIsSpinning] = useState(false);

  const baseURL = useBaseURL((state) => state.baseURL);
  const setAccessToken = useAccessTokenStore((state) => state.setAccessToken);

  async function verifyAndContinue(AgreeAndContinueFlag = false) {
    let tempErrors = {};

    if (!emailValidate.validate(formData.email) || !formData.email)
      tempErrors.email = "Email is required";
    else if (isForgotPassword && AgreeAndContinueFlag) {
      setIsSpinning(true);
      await fetch(`${baseURL}/user/forgot_password`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ email: formData.email }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            toast.success("email sent successfully");
            setOpenModel("emailSentModel");
          }
          if (data.status === "fail") {
            toast.error(data.message);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setFormData({ ...formData, email: "" });
          setIsSpinning(false);
        });
      return;
    }

    // Checking if each required field is filled
    if (!emailValidate.validate(formData.email) || !formData.email)
      tempErrors.email = "Email is required";
    if (!formData.password) tempErrors.password = "Password is required";

    setErrors(tempErrors);
    // If there are no errors, proceed further
    if (AgreeAndContinueFlag && Object.keys(tempErrors).length === 0) {
      // Proceed with further processing, such as form submission
      // console.log("Form is valid, proceeding...");
      setIsSpinning(true);
      const response = await fetch(`${baseURL}/user/login_signin`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login successfull");
        setIsLogin(true);
        setAccessToken(data.access_token);
      } else {
        toast.error(data.message);
        setIsLogin(false);
      }
      setIsSpinning(false);
      setOpenModel(null);

      Object.keys(formData).forEach((key) => {
        setFormData({ ...formData, [key]: "" });
      });
    }
  }

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    verifyAndContinue();
  }, [formData.email]);

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${codeResponse.access_token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const userData = {
            email_verified: data?.email_verified,
            googleId: data?.sub,
          };
          useLogin(userData, setOpenModel, setIsLogin);
        })
        .catch((err) => console.log(err));
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  const [isForgotPassword, setIsForgotPassword] = useState(false);

  return (
    <div
      ref={LoginRef}
      className="fixed top-0 z-20 w-full h-full pointer-events-none bg-black/40"
    >
      ;{/* <ToastContainer /> */}
      <div className="w-[568px] bg-white rounded-xl absolute z-20 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] pointer-events-auto">
        {/* Cross button */}
        <Abutton
          className={`leading-[70px] items-center text-[1.1em] font-bold mx-5`}
          icon={
            <RxCross2
              className="hover:bg-[var(--general-hover)] active:scale-[0.98] p-[0.5rem] rounded-full"
              onClick={() => setOpenModel(null)}
              size={32}
            />
          }
          title={"Log in with"}
        />
        <hr />
        <div className="max-h-[70vh] overflow-y-auto [&>*:nth-child(n)]:mx-5">
          {/* Welcome */}
          <h1 className="text-[1.6em] font-semibold leading-[80px]">
            Welcome to Airbnb
          </h1>
          {/* Select */}

          <div className="pt-2 pb-4">
            <Authfield
              field_name={"Email"}
              className={`rounded-md`}
              name="email"
              value={formData.email}
              onChange={handleFormData}
              // warning={warning}
            />
            {errors.email && <Validity message={"Enter a valid email"} />}
          </div>
          {!isForgotPassword && (
            <div className="pb-8">
              <Authfield
                field_name={"Password"}
                className={`rounded-md`}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleFormData}
              />
              {errors.password && (
                <Validity message={"please provide password"} />
              )}
            </div>
          )}

          {/* end Welcome */}
          {/* continue */}
          <div
            className="text-center bg-gradient-to-r from-[#E51D4F] to-[#D90568] py-[10px] text-white font-semibold text-[1.2em] rounded-md active:scale-95 ease-in-out duration-75 flex justify-center items-center gap-2 cursor-pointer"
            onClick={() => verifyAndContinue(true)}
          >
            {isSpinning && (
              <div>
                <CgSpinner className="inline-block spinner" />
              </div>
            )}
            <button>{isForgotPassword ? "Forgot Password" : "Continue"}</button>
          </div>
          <p className="pt-2">
            Dont't have an Account yet?{" "}
            <button
              onClick={() => setOpenModel("signUpPage")}
              className="text-rose-500 active:scale-95"
            >
              Sign up now
            </button>
            <button
              className="float-right px-3 py-1 active:scale-95 bg-slate-100"
              onClick={() => setIsForgotPassword(!isForgotPassword)}
            >
              {isForgotPassword ? "Login" : "Forgot Password?"}
            </button>
          </p>
          {/* or */}
          <div className="relative">
            <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <span className="absolute px-5 text-sm font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white -top-3 dark:bg-gray-900">
              or
            </span>
          </div>
          {/* Auth field */}
          <div>
            {/* Facebook Auth */}
            <Abutton
              icon={<IoLogoFacebook color="#1877F2" size={28} />}
              title={"Continue with Facebook"}
              className={
                "border rounded-md py-3 px-4 mb-4 active:scale-95 ease-in-out duration-75"
              }
            />
            {/* Google Auth */}
            <Abutton
              icon={<FcGoogle size={20} />}
              title={"Continue with Google"}
              className={
                "border rounded-md py-3 px-5 mb-4 active:scale-95 ease-in-out duration-75"
              }
              googleLogin={googleLogin}
            />
            {/* Apple Auth */}
            <Abutton
              icon={<SiApple size={20} />}
              title={"Continue with Apple"}
              className={
                "border rounded-md py-3 px-5 mb-4 active:scale-95 ease-in-out duration-75"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
