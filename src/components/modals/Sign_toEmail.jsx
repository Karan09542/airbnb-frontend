import React, { useEffect, useRef, useState } from "react";
import Abutton from "../Abutton";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { Link } from "react-router-dom";

import Authfield from "../Authfield";
import useOutsideClose from "../../hooks/useOutsideClose";
import Validity from "../Validity";
import { toast } from "react-toastify";
import {
  useFormDataStore,
  useLoginStore,
  useOpenModalStore,
  useOTP,
} from "../../../store/credentialStore";

function Sign_toEmail() {
  const [check, setChecked] = useState(false);
  const passwordRef = useRef(null);
  const pageReference = useRef(null);
  function togglePassword() {
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
    } else {
      passwordRef.current.type = "password";
    }
  }
  const setOpenModel = useOpenModalStore((state) => state.setOpenModel);

  useOutsideClose({
    setState: setOpenModel,
    reference: pageReference,
    arg: "signUpPage",
  });

  const formData = useFormDataStore((state) => state.formData);
  const setFormData = useFormDataStore((state) => state.setFormData);

  function handleFormData(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const [errors, setErrors] = useState({});
  const setIsLogin = useLoginStore((state) => state.setIsLogin);

  const setOtp = useOTP((state) => state.setOtp);

  async function verifyAndContinue(AgreeAndContinueFlag = false) {
    let tempErrors = {};

    // Checking if each required field is filled
    if (!formData.firstName) tempErrors.firstName = "First name is required";
    if (!formData.lastName) tempErrors.lastName = "Last name is required";
    if (!formData.dob) tempErrors.dob = "Date of birth is required";
    if (!formData.email) tempErrors.email = "Email is required";
    if (!formData.password)
      tempErrors.password = "Password is required & length must be > 8";
    if (formData.password !== formData.passwordConfirm) {
      tempErrors.passwordConfirm = "Passwords do not match";
    }

    setErrors(tempErrors);

    // If there are no errors, proceed further
    if (AgreeAndContinueFlag && Object.keys(tempErrors).length === 0) {
      // Proceed with further processing, such as form submission
      console.log("Form is valid, proceeding...");
      await fetch(`/user/signup`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          if (res.ok) setIsLogin(true);
          else setIsLogin(false);
          return res.json();
        })
        .then((data) => {
          if (data.status === "success") {
            toast.success(data.message);
            setOpenModel("otp");
            setOtp(data.otp);
          } else {
            toast.error(data.message);
          }
        })
        .catch((err) => console.log(err, "सीताराम"))
        .finally(() => {
          Object.keys(formData).forEach((key) => {
            setFormData({ ...formData, [key]: "" });
          });
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
  }, [formData]);

  return (
    <div
      ref={pageReference}
      className="fixed top-0 z-20 w-full h-full pointer-events-none bg-black/40"
    >
      <div className="w-[568px] bg-white rounded-xl absolute z-20 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] pointer-events-auto">
        <Abutton
          className={`leading-[70px] text-[1.1em] font-bold mx-5`}
          icon={
            <MdOutlineArrowBackIosNew
              className="hover:bg-[var(--general-hover)] active:scale-[0.98] p-[0.5rem] rounded-full"
              size={32}
              onClick={() => setOpenModel("signUpPage")}
            />
          }
          title={"Finish signing up"}
        />
        <hr />
        <div className="max-h-[70vh] overflow-y-auto [&>*:nth-child(n)]:mx-5">
          {/* Legal name */}
          <div>
            <h1 className="text-[1.1em] font-semibold leading-[60px]">
              Legal name
            </h1>
            <div>
              <Authfield
                className={`rounded-t-md`}
                field_name="First name on ID"
                name="firstName"
                value={formData.firstName}
                onChange={handleFormData}
              />
              <Authfield
                className={`rounded-b-md`}
                field_name="Last name on ID"
                name="lastName"
                value={formData.lastName}
                onChange={handleFormData}
              />
            </div>
            {(errors.firstName || errors.lastName) && (
              <Validity
                message={`${
                  errors.firstName === null && errors.lastName === null
                    ? "First/Last name is required"
                    : errors.firstName ?? errors.lastName
                }`}
              />
            )}
            <p className="text-[0.8em] pt-2 pb-1 leading-4">
              Make sure this matches the name on your government ID. If you go
              by another name, you can add a{" "}
              <span className="font-semibold text-[var(--light-gray)] hover:text-black underline cursor-pointer">
                preferred first name
              </span>
              .
            </p>
          </div>
          {/* Date of birth */}
          <div>
            <h1 className="text-[1.1em] font-semibold leading-[60px]">
              Date of birth
            </h1>
            <div>
              <Authfield
                field_name={`Date of birth`}
                className={`rounded-md`}
                name="dob"
                value={formData.dob}
                onChange={handleFormData}
              />
            </div>
            {errors.dob && (
              <Validity message={"Select your date of birth to continue"} />
            )}
            <p className="text-[0.8em] pt-2 pb-1 leading-4">
              To sign up, you need to be at least 18. Your birthday won’t be
              shared with other people who use Airbnb.
            </p>
          </div>
          {/* image */}
          <div>
            <h1 className="text-[1.1em] font-semibold leading-[60px]">
              Image url
            </h1>
            <div>
              <Authfield
                field_name={`Image url`}
                className={`rounded-md`}
                name="image"
                value={formData.image}
                onChange={handleFormData}
              />
            </div>
            <p className="text-[0.8em] pt-2 pb-1 leading-4">
              Please provide image url for reference if you want.
            </p>
          </div>
          {/* Contact info */}
          <div>
            <h1 className="text-[1.1em] font-semibold leading-[60px]">
              Contact info
            </h1>
            <div>
              <Authfield
                field_name={`Email`}
                className={`rounded-md`}
                name="email"
                value={formData.email}
                onChange={handleFormData}
              />
            </div>
            <p className="text-[0.8em] pt-2 pb-1 leading-4">
              We'll email you trip confirmations and receipts.
            </p>
          </div>
          {/* Password */}
          <div>
            <h1 className="text-[1.1em] font-semibold leading-[60px]">
              Password
            </h1>
            <div className="relative">
              <Authfield
                ref={passwordRef}
                field_name={`Password`}
                type="password"
                name="password"
                value={formData.password}
                className={`rounded-md`}
                onChange={handleFormData}
              />
              <span
                className="text-[0.79rem] font-medium underline absolute top-[30%] right-3 cursor-pointer"
                onClick={togglePassword}
              >
                Show
              </span>
            </div>
            {/* Confirm Password */}
            <div className="mt-3">
              <Authfield
                ref={passwordRef}
                field_name={`Confirm Password`}
                type="password"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                className={`rounded-md`}
                onChange={handleFormData}
              />
            </div>
            {(errors.password || errors.passwordConfirm) && (
              <Validity message={errors.password || errors.passwordConfirm} />
            )}
            <p className="text-[0.8em] pt-7 pb-4 leading-4">
              By selecting{" "}
              <span className="text-xs font-bold">Agree and continue</span>, I
              agree to Airbnb’s{" "}
              <Link to={"#"} className="font-semibold text-blue-700 underline">
                Terms of Service
              </Link>
              ,{" "}
              <Link to={"#"} className="font-semibold text-blue-600 underline">
                Payments Terms of Service
              </Link>
              , and{" "}
              <Link to={"#"} className="font-semibold text-blue-700 underline">
                Nondiscrimination Policy
              </Link>{" "}
              and acknowledge the{" "}
              <Link to={"#"} className="font-semibold text-blue-700 underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
          {/* Agree and continue */}
          <div
            className="text-center bg-gradient-to-r from-[#E51D4F] to-[#D90568] py-[11px] mt-2 text-white font-semibold text-[1.05em] rounded-md active:scale-95 ease-in-out duration-75
          "
            onClick={() => verifyAndContinue(true)}
          >
            <button>Agree and continue</button>
          </div>
          <div className="relative">
            <hr className="w-full h-px mt-6 mb-5 bg-gray-200 border-0 dark:bg-gray-700" />
          </div>
          <div>
            <p className="text-[0.8em] pt-2 pb-4 leading-4">
              Airbnb will send you members-only deals, inspiration, marketing
              emails, and push notifications. You can opt out of receiving these
              at any time in your account settings or directly from the
              marketing notification.
            </p>
            <div className="flex gap-2 pb-1 text-[0.8rem]">
              {check ? (
                <MdCheckBox size={35} onClick={() => setChecked(false)} />
              ) : (
                <MdCheckBoxOutlineBlank
                  size={35}
                  color="#D3D3D3"
                  onClick={() => setChecked(true)}
                />
              )}
              I don’t want to receive marketing messages from Airbnb.
            </div>
            {/* remember whene re login */}
            <div className="inline-flex items-center py-3">
              <label
                className="relative flex items-center p-1 rounded-full cursor-pointer"
                htmlFor="check"
              >
                <input
                  type="checkbox"
                  className="before:content[''] peer relative h-6 w-6 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                  id="check"
                />
                <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </label>
              <label
                className="mt-px font-light text-gray-700 cursor-pointer select-none"
                htmlFor="check"
              >
                Remember Me
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sign_toEmail;
