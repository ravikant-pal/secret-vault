import { createContext, useState } from "react";

export const KeyContext = createContext({
  selectedKeyId: {},
  setSelectedKeyId: () => {},
});

const KeyProvider = ({ children }) => {
  const [selectedKeyId, setSelectedKeyId] = useState();

  return (
    <KeyContext.Provider value={{ selectedKeyId, setSelectedKeyId }}>
      {children}
    </KeyContext.Provider>
  );
};

export default KeyProvider;
