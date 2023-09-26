import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { UIShell } from "@/components";
import { Content } from "@carbon/react";
import { ThemeProvider } from "@/contexts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <>
        <UIShell />
        <Content
          style={{
            paddingInline: "0",
          }}
        >
          <Component {...pageProps} />
        </Content>
      </>
    </ThemeProvider>
  );
}
