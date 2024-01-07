import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";

import { Libre_Franklin } from "next/font/google";
import { useEffect } from "react";

const LF = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Archi",
  description: "Archi design app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  // TODO: fix
  useEffect(() => {
    window?.document?.querySelector("body")!.classList.add(`font-sans`);
    window?.document?.querySelector("body")!.classList.add(`${LF.variable}`);
  }, []);

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
