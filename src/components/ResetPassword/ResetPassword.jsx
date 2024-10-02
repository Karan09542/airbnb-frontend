import React, { useRef, useState } from "react";
import HostField from "../HostField";
import { useForm } from "react-hook-form";
import Validity from "../Validity";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import { toast, ToastContainer } from "react-toastify";
import { useBaseURL } from "../../../store/credentialStore";

function ResetPassword() {
  const passwordRef = useRef(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [searchParams] = useSearchParams();
  function togglePassword() {
    // if (passwordRef.current.type === "password") {
    //   passwordRef.current.type = "text";
    // } else {
    //   passwordRef.current.type = "password";
    // }

    console.log("toggle password");
  }

  const baseURL = useBaseURL((state) => state.baseURL);

  const onSubmit = async (data) => {
    setIsSpinning(true);
    await fetch(`${baseURL}/user/change_password`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        ...data,
        token: searchParams.get("resetToken"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.status === "success") {
          toast.success("Password changed successfully");
        } else if (data.status === "fail") {
          toast.error(data.message);
        } else if (data.status === "error") {
          toast.error(data.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsSpinning(false));
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
      <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <div className="rounded-md reserve-shadow">
          <form
            className="p-5 w-96 flex flex-col [&>*]:mb-3 [&>*>input:nth-child(n)]:rounded-md rounded-md"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-2xl font-semibold">Reset Password</h1>
            <div className="relative">
              <HostField
                field_name={`Password`}
                type="password"
                className={`rounded-md`}
                register={register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 8,
                    message: "Password should be atleast 8 characters long",
                  },
                })}
              />
              {errors.password && (
                <Validity message={errors.password.message} />
              )}
              <span
                className="text-[0.79rem] font-medium underline absolute top-[30%] right-3 cursor-pointer"
                onClick={togglePassword}
              >
                Show
                {/* Confirm Password */}
              </span>
            </div>
            <div className="mt-3">
              <HostField
                field_name={`Confirm Password`}
                type="password"
                className={`rounded-md`}
                register={register("passwordConfirm", {
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                  required: "Please confirm your password",
                })}
              />
              {errors.passwordConfirm && (
                <Validity message={errors.passwordConfirm.message} />
              )}
            </div>
            <div
              className="text-center bg-gradient-to-r from-[#E51D4F] to-[#D90568] py-[11px] mt-2 text-white font-semibold text-[1.05em] rounded-md active:scale-95 ease-in-out duration-75 flex justify-center cursor-pointer gap-2 items-center
          "
            >
              {isSpinning && (
                <div>
                  <CgSpinner className="inline-block -mt-0.5 spinner" />
                </div>
              )}
              <input type="submit" value="Reset Password" />
            </div>
          </form>
          <button
            className="m-3 active:scale-95 text-center font-semibold text-[0.9em] bg-rose-400 text-white airbnb-setup-shadow py-1 px-3 mt-3 w-fit rounded "
            onClick={() => navigate("/")}
          >
            Home
          </button>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
