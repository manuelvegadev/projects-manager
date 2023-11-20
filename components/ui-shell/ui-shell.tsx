"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Content,
  Header,
  HeaderGlobalAction,
  HeaderGlobalBar,
} from "@carbon/react";
// @ts-ignore
import { Asleep, Light, Switcher } from "@carbon/icons-react";
import { useTheme } from "@/contexts";
import { useSession } from "next-auth/react";

interface UIShellProps {
  children?: React.ReactNode;
}

export const UIShell: React.FC<UIShellProps> = ({ children }) => {
  const { push } = useRouter();
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "white" || theme === "g10";

  const { data } = useSession();

  useEffect(() => {
    document.documentElement.setAttribute("data-carbon-theme", theme);
  }, [theme]);

  return (
    <>
      <Header aria-label="Projects Manager">
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
        {data?.user ? (
          <>
            <span
              dangerouslySetInnerHTML={{
                __html: data.user.name || "",
              }}
              style={{
                marginRight: "1rem",
              }}
            />
            <img
              src={data.user.image || ""}
              alt=""
              style={{
                height: "2rem",
                width: "2rem",
                borderRadius: "50%",
                marginRight: "1rem",
              }}
            />
          </>
        ) : null}
      </Header>
      <Content
        style={{
          paddingInline: "0",
        }}
      >
        {children}
      </Content>
    </>
  );
};
