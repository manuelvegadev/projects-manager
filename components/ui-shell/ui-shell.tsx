"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header, HeaderGlobalAction, HeaderGlobalBar } from "@carbon/react";
// @ts-ignore
import { Asleep, Light, Switcher } from "@carbon/icons-react";
import { useTheme } from "@/contexts";

export const UIShell: React.FC = () => {
  const { push } = useRouter();
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "white" || theme === "g10";

  useEffect(() => {
    document.documentElement.setAttribute("data-carbon-theme", theme);
  }, [theme]);

  return (
    <Header aria-label="TicketSOFT">
      <HeaderGlobalBar style={{ justifyContent: "flex-start" }}>
        <HeaderGlobalAction
          aria-label="Menú"
          tooltipAlignment="start"
          onClick={() => push("/")}
        >
          <Switcher size={20} />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
      <h4>Projects Manager</h4>
      <HeaderGlobalBar>
        <HeaderGlobalAction
          aria-label="Cambiar tema"
          onClick={() => toggleTheme(isLight ? "g100" : "white")}
        >
          {isLight ? <Asleep size={20} /> : <Light size={20} />}
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  );
};
