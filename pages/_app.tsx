import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { UIShell } from "@/components";
import { Content } from "@carbon/react";
import { ThemeProvider } from "@/contexts";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ThemeProvider>
      <SessionProvider session={session}>
        <UIShell />
        <Content
          style={{
            paddingInline: "0",
          }}
        >
          <Component {...pageProps} />
        </Content>
      </SessionProvider>
    </ThemeProvider>
  );
}
