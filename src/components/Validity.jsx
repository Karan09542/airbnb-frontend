import React from "react";
import { IoIosInformationCircle } from "react-icons/io";

function Validity({ message }) {
  return (
    <div className="flex items-center gap-2 mt-2 text-[0.78rem] text-[#C13515]">
      <IoIosInformationCircle
        color="#C13515"
        size={15}
        style={{ transform: "rotate(180deg)" }}
      />
      <span>{message}</span>
    </div>
  );
}

export default Validity;
