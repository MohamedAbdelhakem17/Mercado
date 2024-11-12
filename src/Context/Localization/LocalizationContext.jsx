import { createContext, useContext } from "react";

export const LocalizationContext = createContext();

const useLocalizationContext = () => useContext(LocalizationContext)

export default useLocalizationContext
