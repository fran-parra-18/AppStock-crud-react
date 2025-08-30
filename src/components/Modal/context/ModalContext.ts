/*import { createContext, ReactNode, useState, Dispatch, SetStateAction } from "react";

type ModalContextType = {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
};

const ModalContext = createContext<ModalContextType>({
  state: false,
  setState: () => {},
});

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState(false);

  return (
    <ModalContext.Provider value={{ state, setState }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalProvider, ModalContext };*/