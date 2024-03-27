import { cn } from "@/utils/styleUtils";
import { MoonLoader } from "react-spinners";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "defualt" | "link" | "icon" | "borderless";
  loading?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  loading,
  className,
  children,
  ...props
}) => {
  return (
    <button
      disabled={props.disabled}
      className={cn(
        "flex w-full items-center justify-center py-4",
        "rounded-lg border border-black",
        {
          "w-fit border-0 p-0": variant === "link",
          "... w-fit border-0 p-0": variant === "icon",
          "w-fit border-0 p-0 hover:bg-archi-purple-light":
            variant === "borderless",
          "opacity-50": props.disabled,
        },
        className,
      )}
      {...props}
    >
      {loading ? <MoonLoader color="#fff" size={20} /> : children}
    </button>
  );
};

export default Button;
