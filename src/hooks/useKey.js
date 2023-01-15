import { useContext } from "react";
import { KeyContext } from "../context/KeyProvider";


const useKey = () => {
  return useContext(KeyContext);
};

export default useKey;
