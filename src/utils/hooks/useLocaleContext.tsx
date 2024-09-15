import { ILocaleContextProps, LocaleContext } from "@/context/LocaleContext";
import { useContext } from "react";

export const useLocaleContext = (): ILocaleContextProps => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error(
      "useLocaleContext must be used within a LocaleContextProvider"
    );
  }
  return context;
};
