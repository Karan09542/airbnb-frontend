import React from "react";

function Abutton({
  className,
  icon,
  title,
  continuePhone,
  setContinuePhone,
  googleLogin,
}) {
  return (
    <>
      <div
        className={`select-none flex items-center justify-between ${className}`}
        onClick={() => {
          if (setContinuePhone) setContinuePhone(!continuePhone);
          if (googleLogin) googleLogin();
        }}
      >
        {icon}
        <p className="text-center grow">{title}</p>
      </div>
    </>
  );
}

export default Abutton;
