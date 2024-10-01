import React, { useRef } from "react";

const useThrottle = (func, delay = 1000) => {
  const isThrotlle = useRef(true);
  return (...arg) => {
    if (isThrotlle.current) {
      func();
      isThrotlle.current = false;
      setTimeout(() => (isThrotlle.current = true), delay);
    }
  };
  //   When using a throttled function as an event listener, you often need to pass the event object as an argument. The useThrottle hook can be adjusted to handle arguments more effectively, ensuring that the original event (or any other arguments) is passed correctly to the throttled function.
};

export default useThrottle;
