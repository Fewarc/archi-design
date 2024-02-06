import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";

import { Libre_Franklin } from "next/font/google";
import { useEffect } from "react";
import { CustomAppProps } from "@/utils/types";
import { AllLayouts } from "@/_components/Layouts";

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

  console.log(Component.Layout)
  const Layout = AllLayouts[Component.Layout] ?? ((page) => page);

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
