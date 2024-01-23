import { cn } from "@/utils/styleUtils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "defualt" | "link" | "icon" | "borderless";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        "py-4 w-full flex justify-center items-center",
        "border border-black rounded-lg", 
        {
          "border-0 p-0 w-fit": variant === "link",
          "border-0 p-0 w-fit ...": variant === "icon",
          "border-0 p-0 w-fit hover:bg-archi-purple-light": variant === "borderless",
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
