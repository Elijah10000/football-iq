import { createContext, useContext, useState, ReactNode } from "react";

interface GlobalProviderProps {
  children: ReactNode,
};

interface IGlobalContext {
    isDarkMode: boolean;
    
    setIsDarkMode: (t: boolean) => void;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

  const GlobalContext = createContext<IGlobalContext>({
    isDarkMode: false,
    setIsDarkMode: () => null,
    isOpen: false,
    setIsOpen: () => null,
  });

function GlobalProvider({ children }: GlobalProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <GlobalContext.Provider value={{isDarkMode, setIsDarkMode, isOpen, setIsOpen}}>
      {children}
    </GlobalContext.Provider>
  );
}

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext, GlobalContext };