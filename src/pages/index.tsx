"use client";

import { useState } from "react";
import { LockKeyhole, UserRound } from "lucide-react";
import { loginSchema } from "@/utils/validation";
import Logo from "@/_components/Logo";
import GoogleSignIn from "@/_components/GoogleSignIn";
import Divider from "@/_components/Divider";
import Input from "@/_components/Input";
import Button from "@/_components/Button";
import { LayoutPage } from "@/utils/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

type LoginSchemaType = z.infer<typeof loginSchema>;

const Home: LayoutPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  // TODO: handle login
  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => null;

  return (
    <div className="mx-auto flex h-screen w-full items-center justify-center sm:max-w-[688px] sm:border-x sm:border-black">
      <div className="flex h-full w-full flex-col items-center justify-center px-4 sm:max-w-[484px]">
        <Logo />
        <div className="mt-7 text-center font-bold">
          <h1 className="w-full">Witaj ponownie!</h1>
          <h2 className="text-2xl">Zaloguj się, aby rozpocząć</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-16 flex w-full flex-col gap-y-4 sm:mt-4">
            <GoogleSignIn redirectUrl="/projects" />
            <Divider className="my-2 text-xs font-semibold">lub</Divider>
            <Input
              variant="border_label"
              placeholder="e-mail"
              label={
                <div className="flex items-center">
                  <UserRound size={16} className="-mt-[2px]" />
                  <div className="ml-px text-xs font-semibold">
                    Adres e-mail
                  </div>
                </div>
              }
              error={errors?.email?.message}
              {...register("email")}
            />
            <Input
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
              error={errors?.password?.message}
              {...register("password")}
            />
            <div className="flex w-full justify-end text-sm">
              <Button variant="link" onClick={() => null}>
                Nie pamiętasz hasła?
              </Button>
            </div>
            <Button className="text-base font-bold" type="submit">
              Zaloguj się
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
Home.Layout = "default";
