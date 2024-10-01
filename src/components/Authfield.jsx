import React, { forwardRef, useState } from "react";
const Authfield = forwardRef(
  (
    { field_name, className, type = "text", value, onChange, name, warning },
    ref
  ) => {
    const [inputType, setInputType] = useState(type);
    return (
      <div className={`relative ${false && "w-full"} `}>
        <input
          onFocus={() =>
            (name === "dob" ||
              name === "checkInDate" ||
              name === "checkOutDate") &&
            setInputType("date")
          }
          onBlur={() =>
            (name === "dob" ||
              name === "checkOutDate" ||
              name === "checkInDate") &&
            setInputType(type)
          }
          ref={ref}
          placeholder={field_name}
          className={`code peer h-full w-full pt-4 pb-1.5 font-sans text-[1em] font-normal transition-all  placeholder:opacity-0 focus:placeholder:opacity-100 ${className} ${
            !warning
              ? ""
              : name === "email" &&
                "border border-red-600 focus:border focus:outline-red-700 bg-red-50 text-black"
          }`}
          style={{
            border: !warning
              ? "1px solid rgb(118,118,118)"
              : name === "email" && "1px solid red",
          }}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          autoFocus={warning}
          required
        />
        <label
          className={`after:content[''] pointer-events-none absolute left-3  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-[1.7rem] text-xs ${
            !warning ? "text-gray-500" : name === "email" && "text-red-500"
          } transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-xs peer-focus:left-3 peer-focus:leading-[1.7rem] ${
            !warning
              ? "peer-focus:text-gray-900/80"
              : name === "email" && "peer-focus:text-red-500"
          } peer-focus:after:scale-x-100 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500`}
        >
          {field_name}
        </label>
      </div>
    );
  }
);

export default Authfield;
