import { ModalProps } from "@/utils/types";
import { ProjectStage } from "@prisma/client";
import ActionModal from "../ActionModal";
import Button from "../Button";
import FileDropzone from "../FileDropzone";
import { useState } from "react";
import { File, Trash } from "lucide-react";
import { useUploadStageFiles } from "@/utils/hooks";

interface AddStageFileProps extends ModalProps {
  stage: ProjectStage | null;
}

const AddStageFile: React.FC<AddStageFileProps> = ({
  open,
  onClose,
  stage,
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const { uploadFiles, uploadStatus } = useUploadStageFiles(stage!);

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title="Dodaj plik"
      subtitle={stage?.name}
      className="flex flex-col justify-between"
    >
      <div className="flex h-full flex-col justify-start">
        <FileDropzone onFileChange={setFiles} />
        {!!files.length && (
          <div className="mt-8 text-sm font-bold leading-[14px]">
            Dodane pliki
          </div>
        )}
        {files.map((file) => (
          <div className="mt-3 flex justify-between" key={file.name}>
            <div className="flex items-center gap-x-2">
              <File
                height={40}
                width={40}
                strokeWidth={1.4}
                className="text-archi-purple"
              />
              <div className="text-sm leading-[14px]">{file.name}</div>
            </div>
            <Button
              variant="icon"
              onClick={() =>
                setFiles([...files.filter((savedFile) => savedFile !== file)])
              }
              className="text-archi-purple"
            >
              <Trash />
            </Button>
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-x-4">
        <Button
          onClick={() => onClose()}
          variant="defualt"
          className="mt-9 w-full rounded-full border-0 bg-archi-purple-light px-5 py-2 text-center font-semibold text-archi-purple shadow-double md:w-fit"
        >
          Anuluj
        </Button>
        <Button
          onClick={() => uploadFiles(files)}
          variant="defualt"
          className="mt-9 w-full rounded-full border-0 bg-archi-purple px-5 py-2 text-center font-semibold text-white shadow-double md:w-fit"
        >
          Zapisz
        </Button>
      </div>
    </ActionModal>
  );
};

export default AddStageFile;
