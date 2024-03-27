import { ModalProps } from "@/utils/types";
import { ProjectStage } from "@prisma/client";
import ActionModal from "../ActionModal";
import Button from "../Button";
import FileDropzone from "../FileDropzone";
import { useState } from "react";
import { File, Trash } from "lucide-react";
import { useUploadStageFiles } from "@/utils/hooks";
import UploadFile from "../UploadFile";

interface AddStageFileProps extends ModalProps {
  stage: ProjectStage | null;
  onFinish: () => void;
}

const AddStageFile: React.FC<AddStageFileProps> = ({
  open,
  onClose,
  stage,
  onFinish,
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const { uploadFiles, uploadStatus, loading, resetUploadStatus } =
    useUploadStageFiles(stage!, files, () => {
      onFinish();
      handleClose();
    });

  const handleClose = () => {
    onClose();
    resetUploadStatus();
  };

  return (
    <ActionModal
      open={open}
      onClose={handleClose}
      title="Dodaj plik"
      subtitle={stage?.name}
      className="flex flex-col justify-between"
    >
      <div className="flex h-full flex-col justify-start">
        <FileDropzone onFileChange={setFiles} />
        {!!files.length && (
          <div className="mt-4 text-sm font-bold leading-[14px] md:mt-8">
            Dodane pliki
          </div>
        )}
        {files.map((file, i) => (
          <UploadFile
            key={file.name + new Date().getTime()}
            file={file}
            status={uploadStatus[i] ?? "default"}
            removeFile={() =>
              setFiles([...files.filter((savedFile) => savedFile !== file)])
            }
          />
        ))}
      </div>
      <div className="flex justify-end gap-x-4">
        <Button
          onClick={() => handleClose()}
          variant="defualt"
          className="mt-9 w-full rounded-full border-0 bg-archi-purple-light px-5 py-2 text-center font-semibold text-archi-purple shadow-double md:w-fit"
          disabled={loading}
        >
          Anuluj
        </Button>
        <Button
          onClick={() => uploadFiles(files)}
          variant="defualt"
          className="mt-9 w-full rounded-full border-0 bg-archi-purple px-5 py-2 text-center font-semibold text-white shadow-double md:w-fit"
          disabled={loading}
          loading={loading}
        >
          Zapisz
        </Button>
      </div>
    </ActionModal>
  );
};

export default AddStageFile;
