"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { GlobalTheme } from "@carbon/react";
import { useEffect } from "react";

type ThemeType = Exclude<
  React.ComponentProps<typeof GlobalTheme>["theme"],
  undefined
>;
type ContextType = {
  theme: ThemeType;
  toggleTheme: (theme: ThemeType) => void;
};

const defaultContext: ContextType = {
  theme: "white",
  toggleTheme: () => {},
};

export const themeContext = createContext<ContextType>(defaultContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>(defaultContext.theme);

  const toggleTheme = useCallback((theme: ThemeType) => {
    setTheme(theme);
  }, []);

  const contextValues = useMemo(() => ({ theme, toggleTheme }), [theme]);

  useEffect(() => {
    if (!window) return;

    setTheme(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "g100"
        : "white",
    );

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        setTheme(event.matches ? "g100" : "white");
      });
  }, []);

  return (
    <themeContext.Provider value={contextValues}>
      <GlobalTheme theme={theme}>{children}</GlobalTheme>
    </themeContext.Provider>
  );
};

export const useTheme = () => {
  const { theme, toggleTheme } = useContext(themeContext);
  return { theme, toggleTheme };
};
