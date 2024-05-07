import { SessionProvider } from "next-auth/react";

import { api } from "@/utils/api";

import "@/styles/globals.css";

import { Libre_Franklin } from "next/font/google";
import { useEffect } from "react";
import { CustomAppProps } from "@/utils/types";
import { AllLayouts } from "@/_components/Layouts";
import ContextProvider from "@/_components/Context";

const LF = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Archi",
  description: "Archi design app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  // TODO: fix
  useEffect(() => {
    window?.document?.querySelector("body")!.classList.add(`font-sans`);
    window?.document?.querySelector("body")!.classList.add(`${LF.variable}`);
  }, []);

  const Layout = AllLayouts[Component.Layout] ?? AllLayouts["default"];

  return (
    <SessionProvider session={session}>
      <ContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ContextProvider>
    </SessionProvider>
  );
}

export default api.withTRPC(MyApp);
