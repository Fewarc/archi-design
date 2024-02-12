import { cn } from "@/utils/styleUtils";
import { ReactNode } from "react";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "default" | "border_label";
  label?: React.ReactNode;
  error?: string[];
  icon?: ReactNode;
  areaClassName?: string;
  className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  variant = "default",
  label,
  error,
  icon,
  areaClassName,
  className,
  ...props
}) => {
  // TODO: support resize (?)

  return (
    <div>
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
          className="h-full w-full"
        >
          <textarea 
            className={cn(
              "h-full w-full rounded-lg px-4 py-2 resize-none outline-none",
              {
                "outline-none": variant === "default",
              },
              areaClassName
              )}
              spellCheck={false}
              {...props}
          />

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
    </div>
  );
}

export default TextArea;