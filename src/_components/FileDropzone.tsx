import { cn } from "@/utils/styleUtils";
import { useState } from "react";
import FileInput from "./FileInput";

interface FileDropzoneProps {
  className?: string;
  onFileChange: (files: File[]) => void;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({
  className,
  onFileChange,
}) => {
  const [shouldHighlight, setShouldHighlight] = useState(false);

  const preventDefaultHandler = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        "h-14 rounded-md border-2 border-dashed border-archi-purple-light md:h-40",
        {
          "border-archi-purple bg-archi-purple-light bg-opacity-30":
            shouldHighlight,
        },
        className,
      )}
      onDragOver={(e) => {
        preventDefaultHandler(e);
        setShouldHighlight(true);
      }}
      onDragEnter={(e) => {
        preventDefaultHandler(e);
        setShouldHighlight(true);
      }}
      onDragLeave={(e) => {
        preventDefaultHandler(e);
        setShouldHighlight(false);
      }}
      onDrop={(e) => {
        preventDefaultHandler(e);
        const files = Array.from(e.dataTransfer.files);
        onFileChange(files);
        setShouldHighlight(false);
      }}
    >
      {shouldHighlight ? (
        <div className="font-semibold text-archi-purple">
          Upuść pliki tutaj...
        </div>
      ) : (
        <FileInput
          handleFiles={(files) => onFileChange(files)}
          className="bg-archi-purple-light"
        >
          Dodaj pliki
        </FileInput>
      )}
    </div>
  );
};

export default FileDropzone;
