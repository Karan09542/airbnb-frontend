import React, { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoLogoFacebook } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { SiApple } from "react-icons/si";
import { HiOutlineMail } from "react-icons/hi";
import PhoneIcon from "../../assets/phone.svg?react";

import Abutton from "../Abutton";
import Authfield from "../Authfield";
import useOutsideClose from "../../hooks/useOutsideClose";
import { Link } from "react-router-dom";
import emailValidate from "email-validator";
import Validity from "../Validity";
import {
  useFormDataStore,
  useLoginStore,
  useOpenModalStore,
} from "../../../store/credentialStore";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import { useSignUp } from "../../hooks/useAuthenticateWith";

function SignUp() {
  useEffect(() => {
    toast.info('Continue with "Email And Google" option is available for now');
  }, []);
  const formData = useFormDataStore((state) => state.formData);
  const setFormData = useFormDataStore((state) => state.setFormData);

  function handleFormData(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  useEffect(() => {
    formData.email === ""
      ? setWarning(false)
      : setWarning(!emailValidate.validate(formData.email));
    setIsValid(true);
  }, [formData.email]);

  const [warning, setWarning] = useState(false);
  const [isValid, setIsValid] = useState(false); // check email is valid or not see in handleContinue for futher process to full SignUp

  // continue to full sign in form
  function handleContinue() {
    const valid = emailValidate.validate(formData.email);
    setIsValid(valid);
    valid && setOpenModel("signToEmail");
  }

  const [continuePhone, setContinuePhone] = useState(false); // set you want SignUp continue with Phone OR Email
  const setOpenModel = useOpenModalStore((state) => state.setOpenModel);

  const SignUpRef = useRef(null);

  useOutsideClose({
    setState: setOpenModel,
    reference: SignUpRef,
    arg: "null",
  });

  const [countires, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  useEffect(() => {
    console.log(
      "country-code",
      /[+0-9]{1,}/.exec(country)?.[0],
      /[^+0-9()]{1,}/.exec(country)
    );
  }, [country]);

  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json"
    )
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.log(err));
  }, []);

  const setIsLogin = useLoginStore((state) => state.setIsLogin);

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
            email: data?.email,
            firstName: data?.given_name,
            lastName: data?.family_name,
            email_verified: data?.email_verified,
            image: data?.picture,
            googleId: data?.sub,
          };
          useSignUp(userData, setOpenModel, setIsLogin);
        })
        .catch((err) => console.log(err));
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <div
      ref={SignUpRef}
      className="fixed top-0 z-20 w-full h-full pointer-events-none bg-black/40"
    >
      <div className="w-[568px] bg-white rounded-xl absolute z-20 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] pointer-events-auto">
        {/* Cross button */}
        <Abutton
          className={`leading-[70px] text-[1.1em] font-bold mx-5`}
          icon={
            <RxCross2
              className="hover:bg-[var(--general-hover)] active:scale-[0.98] p-[0.5rem] rounded-full"
              onClick={() => setOpenModel(null)}
              size={32}
            />
          }
          title={"Sign up with"}
        />
        <hr />
        <div className="max-h-[70vh] overflow-y-auto [&>*:nth-child(n)]:mx-5">
          {/* Welcome */}
          <h1 className="text-[1.6em] font-semibold leading-[80px]">
            Welcome to Airbnb
          </h1>
          {/* Select */}
          {continuePhone ? (
            <div className="pt-2 pb-4">
              <Authfield
                field_name={"Email"}
                className={`rounded-md`}
                name="email"
                value={formData.email}
                onChange={handleFormData}
                warning={warning}
              />
              {!isValid && <Validity message={"Enter a valid email"} />}
            </div>
          ) : (
            <div>
              <select
                name="countires/Region"
                id=""
                className="code rounded-t-md"
                style={{
                  border: "1px solid rgb(118,118,118)",
                }}
                onChange={(e) => setCountry(e.target.value)}
              >
                {countires.map((desh) => {
                  return (
                    <option key={desh.code}>
                      {desh.name}({desh.dial_code})
                    </option>
                  );
                })}
              </select>

              <div>
                <Authfield
                  field_name={"Phone number"}
                  className={`rounded-b-md`}
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormData}
                />
              </div>
              <p className="text-[0.8em] pt-2 pb-4 leading-4">
                We’ll call or text you to confirm your number. Standard message
                and data rates apply.{" "}
                <Link
                  to={`#`}
                  className="font-semibold underline cursor-pointer"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          )}
          {/* end Welcome */}
          {/* continue */}
          <div
            className="text-center bg-gradient-to-r from-[#E51D4F] to-[#D90568] py-[10px] text-white font-semibold text-[1.2em] rounded-md active:scale-95 ease-in-out duration-75"
            onClick={handleContinue}
          >
            <button>Continue</button>
          </div>
          <p className="pt-2">
            have an Account?{" "}
            <button
              onClick={() => setOpenModel("login")}
              className="text-rose-500 active:scale-95"
            >
              Login now
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
            {/* Auth By Email */}
            <Abutton
              icon={continuePhone ? <HiOutlineMail /> : <PhoneIcon />}
              title={
                continuePhone ? "Continue with Phone" : "Continue with email"
              }
              className={
                "border rounded-md py-3 px-5 mb-4 active:scale-95 ease-in-out duration-75"
              }
              continuePhone={continuePhone}
              setContinuePhone={setContinuePhone}
            />
          </div>
          {/* <input type="color" /> */}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
