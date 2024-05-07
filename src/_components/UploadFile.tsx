import { File, Trash } from "lucide-react";
import Button from "./Button";
import { FileUploadStatus } from "@/utils/types";
import { cn } from "@/utils/styleUtils";

interface UploadFileProps {
  file: File;
  status: FileUploadStatus;
  removeFile: () => void;
}

const UploadFile: React.FC<UploadFileProps> = ({
  file,
  status,
  removeFile,
}) => {
  return (
    <div className="mt-3 flex justify-between">
      <div className="flex w-full items-center gap-x-2">
        <File
          height={40}
          width={40}
          strokeWidth={1.4}
          className="flex-shrink-0 text-archi-purple"
        />
        <div className="flex w-full flex-col gap-y-1">
          <div className="text-sm leading-[14px]">{file.name}</div>
          <div
            className={cn(
              "relative h-2 w-[90%] overflow-hidden rounded-full bg-archi-gray-light",
              {
                hidden: status === "default",
              },
            )}
          >
            <div
              className={cn(
                "h-full  bg-archi-purple transition-transform duration-1000",
                {
                  "-translate-x-full":
                    status !== "loading" && status !== "success",
                  "-translate-x-[15%]": status === "loading",
                  "-translate-x-0": status === "success",
                },
              )}
            ></div>
          </div>
        </div>
      </div>
      {status === "default" && (
        <Button
          variant="icon"
          onClick={() => removeFile()}
          className="text-archi-purple"
        >
          <Trash />
        </Button>
      )}
    </div>
  );
};

export default UploadFile;
