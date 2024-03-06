import { cn } from "@/utils/styleUtils";
import { useState } from "react";
import FileInput from "./FileInput";

interface FileDropzoneProps {}

const FileDropzone: React.FC<FileDropzoneProps> = () => {
  const [fileList, setFileList] = useState<File[] | null>(null);
  const [shouldHighlight, setShouldHighlight] = useState(false);

  const preventDefaultHandler = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  console.log(fileList);

  return (
    <div
      className={cn("flex justify-center items-center", 
      "rounded-md border-2 border-dashed border-archi-purple-light h-60", {
        "border-archi-purple bg-archi-purple-light bg-opacity-30": shouldHighlight
      })}
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
        setFileList(files);
        setShouldHighlight(false);
      }}
    >
      <div className="flex flex-col">
        <div className="w-full text-center text-archi-purple-light">Upuśc tutaj</div>
        <div className="w-full text-center text-archi-purple-light">lub</div>
        <FileInput handleFiles={() => null}>
          Dodaj pliki
        </FileInput>
      </div>
    </div>
  );
};

export default FileDropzone;
