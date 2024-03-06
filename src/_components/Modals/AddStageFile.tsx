import { ModalProps } from "@/utils/types";
import { ProjectStage } from "@prisma/client";
import ActionModal from "../ActionModal";
import Button from "../Button";
import FileDropzone from "../FileDropzone";

interface AddStageFileProps extends ModalProps {
  stage: ProjectStage | null;
}

const AddStageFile: React.FC<AddStageFileProps> = ({ open, onClose, stage }) => {
  return (
    <ActionModal open={open} onClose={onClose} title="Dodaj plik" className="flex flex-col justify-between">
      <div className="h-full flex flex-col justify-start">
      <FileDropzone />

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
          onClick={() => null}
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