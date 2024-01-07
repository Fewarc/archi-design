"use client"
import { signIn } from "next-auth/react";
import Button from "./Button";
import Image from "next/image";

interface GoogleSignInProps {
  redirectUrl?: string
}

const GoogleSignIn: React.FC<GoogleSignInProps> = ({
  redirectUrl
}) => {
  return <>
    <Button onClick={() => signIn(undefined, {
      callbackUrl: `${redirectUrl ?? window.location.origin}`
    })}>
      <Image 
        src="Google_logo.svg"
        alt="Google Logo"
        width={32}
        height={32}
      />
      <div>
        Kontynuuj przy pomocy Googla
      </div>
    </Button>
  </>
}

export default GoogleSignIn;