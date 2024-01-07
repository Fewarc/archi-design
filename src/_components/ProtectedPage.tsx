"use client"
import { BuiltInProviderType } from "next-auth/providers/index";
import { LiteralUnion, getSession, signIn } from "next-auth/react";
import { ReactNode, useEffect } from "react";

interface ProtectedPageProps {
  children: ReactNode;
  redirectUrl?: string;
  provider?: LiteralUnion<BuiltInProviderType>;
}

const ProtectedPage: React.FC<ProtectedPageProps> = ({
  children,
  redirectUrl,
  provider,
}) => {

  // useEffect(() => {
    void (async () => {
      const session = await getSession();
      if (!session || !session.user) {
        await signIn(provider, {
          callbackUrl: `${redirectUrl ?? window.location.origin}`,
        });
      }
    })();
  // }, []);

  return <>{children}</>;
};

export default ProtectedPage;
