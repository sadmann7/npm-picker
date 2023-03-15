import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type AppContextType = {
  generatedPkgs: string;
  setGeneratedPkgs: Dispatch<SetStateAction<string>>;
};

const AppContext = createContext<AppContextType>({
  generatedPkgs: "",
  setGeneratedPkgs: () => {},
});
const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [generatedPkgs, setGeneratedPkgs] = useState<string>("");

  return (
    <AppContext.Provider
      value={{
        generatedPkgs,
        setGeneratedPkgs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, useAppContext };
