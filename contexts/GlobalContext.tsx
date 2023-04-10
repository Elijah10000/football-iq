import { createContext, useContext, useState, ReactNode } from "react";

interface GlobalProviderProps {
    children: ReactNode,
};

interface IGlobalContext {
    isDarkMode: boolean,
    setIsDarkMode: (t: boolean) => void;
}

const GlobalContext = createContext<IGlobalContext>({
    isDarkMode: false,
    setIsDarkMode: () => null,
});


function GlobalProvider({ children }: GlobalProviderProps) {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    

    return (
        <GlobalContext.Provider value={{isDarkMode, setIsDarkMode}}>
            {children}
        </GlobalContext.Provider>
    );
}


const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext, GlobalContext }