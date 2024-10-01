import React from "react";
import { useOpenModalStore } from "../../../store/credentialStore";
import { RxCross2 } from "react-icons/rx";

const EmailSent = () => {
  const setOpenModel = useOpenModalStore((state) => state.setOpenModel);

  return (
    <div className="fixed z-20 w-full h-full bg-black/40">
      <div className="absolute max-w-md p-6 mt-6 text-center -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-lg shadow-md pointer-events-auto left-1/2 top-1/2">
        <RxCross2
          className="hover:bg-[var(--general-hover)] active:scale-95 p-[0.5rem] rounded-full"
          onClick={() => setOpenModel(null)}
          size={32}
        />
        <svg
          className="w-12 h-12 mx-auto mb-4 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2l4 -4m5 2a9 9 0 11-18 0a9 9 0 0118 0z"
          ></path>
        </svg>
        <h3 className="text-lg font-semibold text-gray-800">Email Sent!</h3>
        <p className="mt-2 text-gray-600">
          A password reset link has been sent to your email address. Please
          check your inbox and follow the instructions to reset your password.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          If you don't see the email, check your spam or junk folder.
        </p>
        <button
          className="px-4 py-2 mt-4 text-white transition-all bg-blue-500 rounded hover:bg-blue-600 active:scale-95"
          onClick={() => setOpenModel("login")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default EmailSent;
