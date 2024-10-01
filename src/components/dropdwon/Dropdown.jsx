import React from "react";

function Dropdown({ children, className }) {
  return (
    <>
      <div className={`${className}`}>{children}</div>
    </>
  );
}

export default Dropdown;
