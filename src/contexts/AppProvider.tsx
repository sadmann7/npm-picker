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
  isChartView: boolean;
  setIsChartView: Dispatch<SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType>({
  generatedPkgs: "",
  setGeneratedPkgs: () => {},
  isChartView: false,
  setIsChartView: () => {},
});
const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [generatedPkgs, setGeneratedPkgs] = useState<string>("");
  const [isChartView, setIsChartView] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        generatedPkgs,
        setGeneratedPkgs,
        isChartView,
        setIsChartView,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, useAppContext };
