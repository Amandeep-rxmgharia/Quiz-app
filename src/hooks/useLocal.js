import { useEffect, useState } from "react";

export const useLocal = (key, initialValue) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem(key));
    if (existingData) {
      setValue(existingData);
    } else {
      localStorage.setItem(key, JSON.stringify(initialValue));
    }
  }, []);

  const updateValue = (newValue) => {
    if (typeof newValue != "function") {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
    else {
       localStorage.setItem(key, JSON.stringify(newValue(value)));
    }
    setValue(newValue)
  };
  return [value, updateValue];
};
