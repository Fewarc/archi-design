import { cn } from "@/utils/styleUtils";
import Button from "./Button";
import React, { ReactNode, forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "border_label";
  label?: React.ReactNode;
  password?: boolean;
  error?: string[] | string;
  icon?: ReactNode;
  inputClassName?: string;
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "default",
      label,
      password = false,
      error,
      icon,
      className,
      inputClassName,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
      <>
        <div
          className={cn(
            "flex h-14 border border-gray-500",
            {
              "relative rounded-lg border-black": variant === "border_label",
              "relative h-fit min-h-[33px] border-0 border-b border-black p-0":
                variant === "default",
            },
            className,
          )}
        >
          {!!icon && icon}
          {label && (
            <label
              className={cn("", {
                "absolute left-4 -translate-y-1/2 transform bg-white px-1":
                  variant === "border_label",
              })}
            >
              {label}
            </label>
          )}
          <div
            className={cn("h-full w-full", {
              "flex items-center": password,
            })}
          >
            <input
              className={cn(
                "h-full w-full rounded-lg px-4",
                {
                  "pr-12": password,
                  "outline-none": variant === "default",
                },
                inputClassName,
              )}
              type={password && !showPassword ? "password" : "text"}
              ref={ref}
              {...props}
            />
            {password && (
              <Button
                className="absolute right-3"
                variant="icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </Button>
            )}
          </div>
        </div>
        {!!error && (
          <div className="px-2 pt-1 text-[12px]">
            <div className="flex flex-col text-red-500">
              {Array.isArray(error)
                ? error.map((e) => <div key={e}>{e}</div>)
                : error}
            </div>
          </div>
        )}
      </>
    );
  },
);

export default Input;
