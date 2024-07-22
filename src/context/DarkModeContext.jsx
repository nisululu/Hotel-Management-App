import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDark, setIsDark] = useLocalStorageState(false, "dark-mode");

  function toogleDarkMode() {
    setIsDark((isDark) => !isDark);
  }

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDark]);

  return (
    <DarkModeContext.Provider value={{ isDark, toogleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) throw new Error("Used outside context provider.");
  return context;
}

export { DarkModeProvider, useDarkMode };
