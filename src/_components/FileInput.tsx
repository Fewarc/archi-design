import { ChangeEvent, InputHTMLAttributes, ReactNode, useRef } from "react";
import Button from "./Button";
import { cn } from "@/utils/styleUtils";

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode;
  handleFiles: (files: File[]) => void;
  className?: string;
}

const FileInput: React.FC<FileInputProps> = ({
  children,
  handleFiles,
  className,
  ...inputProps
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(new Array<File>(...files));
  };

  return (
    <>
      <Button
        className={cn(
          "rounded-full bg-archi-purple  px-3 py-1 font-semibold text-white",
          className,
        )}
        variant="borderless"
        onClick={() => inputRef?.current?.click()}
      >
        {children}
      </Button>
      <input
        className="hidden"
        type="file"
        ref={inputRef}
        multiple
        onChange={handleFileUpload}
        {...inputProps}
      />
    </>
  );
};

export default FileInput;
