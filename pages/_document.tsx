import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <main style={{ paddingTop: "3.5rem" }}>
          <Main />
        </main>
        <NextScript />
      </body>
    </Html>
  );
}
