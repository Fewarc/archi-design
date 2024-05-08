import { ModalProps } from "@/utils/types";
import { Project } from "@prisma/client";
import ActionModal from "../ActionModal";
import Button from "../Button";

interface ArchiveProjectProps extends ModalProps {
  project: Project | null;
}

const ArchiveProject: React.FC<ArchiveProjectProps> = ({
  project,
  open,
  onClose,
}) => {
  const handleClose = () => {
    onClose();
  };

  // TODO: add archive functionality

  return (
    <ActionModal
      open={open}
      onClose={handleClose}
      title="Archiwizuj"
      subtitle={project?.name}
      className="flex flex-col justify-between"
    >
      <div className="h-full">
        Czy na pewno chcesz zarchiwizować projekt {project?.name}?
      </div>
      <div className="flex justify-end gap-x-4">
        <Button
          onClick={() => handleClose()}
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
          Archiwizuj
        </Button>
      </div>
    </ActionModal>
  );
};

export default ArchiveProject;
