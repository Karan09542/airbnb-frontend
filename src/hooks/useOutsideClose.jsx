import React, { useEffect } from "react";

const useOutsideClose = ({ setState, reference, arg }) => {
  return useEffect(() => {
    function handleClick(e) {
      if (reference.current && !reference.current?.contains(e.target)) {
        if (arg === "handleBigSearch") {
          console.log("mahadev");
          if (window.scrollY <= 0) setState(true);
          else setState(false);
        } else setState(arg);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.addEventListener("mousedown", handleClick);
    };
  }, [setState]);
};

export default useOutsideClose;
