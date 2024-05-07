import { ModalProps } from "@/utils/types";
import ActionModal from "../ActionModal";
import { ReactNode } from "react";
import Button from "../Button";

interface DeleteModalProps extends ModalProps {
  children: ReactNode;
  onDelete: Function;
  modalTitle?: string;
  subtitle?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  children,
  onDelete,
  open,
  onClose,
  modalTitle,
  subtitle,
}) => {
  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title={modalTitle || ""}
      subtitle={subtitle}
      className="flex flex-col justify-between"
    >
      <div className="h-full">{children}</div>
      <div className="flex justify-end gap-x-4">
        <Button
          onClick={() => onClose()}
          variant="defualt"
          className="mt-9 w-full rounded-full border-0 bg-archi-purple-light px-5 py-2 text-center font-semibold text-archi-purple shadow-double md:w-fit"
        >
          Anuluj
        </Button>
        <Button
          onClick={() => onDelete()}
          variant="defualt"
          className="mt-9 w-full rounded-full border-0 bg-archi-purple px-5 py-2 text-center font-semibold text-white shadow-double md:w-fit"
        >
          Usuń
        </Button>
      </div>
    </ActionModal>
  );
};

export default DeleteModal;
