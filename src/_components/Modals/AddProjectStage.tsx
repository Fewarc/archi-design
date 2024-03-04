import { ModalProps } from "@/utils/types";
import ActionModal from "../ActionModal";
import Button from "../Button";
import Input from "../Input";
import { useState } from "react";

interface AddProjectStageProps extends ModalProps {
  projectId: string;
}

const AddProjectStage: React.FC<AddProjectStageProps> = ({ open, onClose }) => {
  const [stageName, setStageName] = useState("");

  return (
    <ActionModal open={open} onClose={onClose} title="Dodaj" subtitle="Nowy etap projektu">
      <div className="mt-4 flex flex-col gap-y-4">
        <Input
          value={stageName}
          onChange={(e) => setStageName(e.target.value)}
          variant="border_label"
          placeholder="Etap I"
          label={<div className="text-xs font-semibold">Nazwa etapu</div>}
          // error={errors?.category?._errors}
        />
        </div>
      <div className="flex justify-end gap-x-4">
        <Button
          onClick={() => null}
          variant="defualt"
          className="mt-9 w-full rounded-full border-0 bg-archi-purple px-5 py-2 text-center font-medium text-white shadow-double md:w-fit"
        >
          Dodaj
        </Button>
      </div>
    </ActionModal>
  );
};

export default AddProjectStage;