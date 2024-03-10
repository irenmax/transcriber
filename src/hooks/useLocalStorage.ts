import { useEffect, useState } from "react";
import { debounce } from "lodash";

const useLocalStorage = (key: string) => {
  const [data, setData] = useState<string>("");

  useEffect(() => {
    setData(localStorage.getItem(key) || "");
  }, [key]);

  const saveToLocalStorage = debounce((value: string) => {
    localStorage.setItem(key, value);
  }, 1000);

  const update = (value: string) => {
    setData(value);
    saveToLocalStorage(value);
  };

  return [data, update] as const;
};

export default useLocalStorage;
