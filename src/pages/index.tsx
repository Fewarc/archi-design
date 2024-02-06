"use client";

import { useState } from "react";
import { LockKeyhole, UserRound } from "lucide-react";
import { loginSchema } from "@/utils/validation";
import { useValidation } from "@/utils/hooks";
import Logo from "@/_components/Logo";
import GoogleSignIn from "@/_components/GoogleSignIn";
import Divider from "@/_components/Divider";
import Input from "@/_components/Input";
import Button from "@/_components/Button";
import { LayoutPage } from "@/utils/types";

const Home: LayoutPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { errors, validate } = useValidation(loginSchema);

  function handleLogin() {
    const validatedData = validate({
      email,
      password,
    });

    if (!!validatedData) {
      // TODO: handle manual login here
    }
  }

  return (
    <div className="mx-auto flex h-screen w-full items-center justify-center sm:max-w-[688px] sm:border-x sm:border-black">
      <div className="flex h-full w-full flex-col items-center justify-center px-4 sm:max-w-[484px]">
        <Logo />
        <div className="mt-7 text-center font-bold">
          <h1 className="w-full">Witaj ponownie!</h1>
          <h2 className="text-2xl">Zaloguj się, aby rozpocząć</h2>
        </div>
        <div className="mt-16 flex w-full flex-col gap-y-4 sm:mt-4">
          <GoogleSignIn redirectUrl="/projects" />
          <Divider className="my-2 text-xs font-semibold">lub</Divider>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="border_label"
            placeholder="e-mail"
            label={
              <div className="flex items-center">
                <UserRound size={16} className="-mt-[2px]" />
                <div className="ml-px text-xs font-semibold">Adres e-mail</div>
              </div>
            }
            error={errors?.email?._errors}
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            password
            className="mt-4"
            variant="border_label"
            placeholder="hasło"
            label={
              <div className="flex items-center">
                <LockKeyhole size={16} className="-mt-[2px] mr-px" />
                <div className="ml-px text-xs font-semibold">Hasło</div>
              </div>
            }
            error={errors?.password?._errors}
          />
          <div className="flex w-full justify-end text-sm">
            <Button
              variant="link"
              onClick={() => null}
            >
              Nie pamiętasz hasła?
            </Button>
          </div>
          <Button className="text-base font-bold" onClick={handleLogin}>
            Zaloguj się
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
Home.Layout = "default"