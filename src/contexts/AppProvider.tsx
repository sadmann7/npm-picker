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
  isGraphView: boolean;
  setIsGraphView: Dispatch<SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType>({
  generatedPkgs: "",
  setGeneratedPkgs: () => {},
  isGraphView: false,
  setIsGraphView: () => {},
});
const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [generatedPkgs, setGeneratedPkgs] = useState<string>("");
  const [isGraphView, setIsGraphView] = useState(false);

  return (
    <AppContext.Provider
      value={{
        generatedPkgs,
        setGeneratedPkgs,
        isGraphView,
        setIsGraphView,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, useAppContext };
