import React, { useEffect, useState } from "react";

export const useDebounce = (initialValue, delay = 1000) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    let timer;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      setValue(initialValue);
    }, delay);
    return () => clearTimeout(timer);
  }, [initialValue]);
  return value;
};
