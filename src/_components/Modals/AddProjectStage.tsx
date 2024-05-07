import { ModalProps } from "@/utils/types";
import ActionModal from "../ActionModal";
import Button from "../Button";
import Input from "../Input";
import { useState } from "react";
import { useValidation } from "@/utils/hooks";
import { addStageSchema } from "@/utils/validation";
import { api } from "@/utils/api";

interface AddProjectStageProps extends ModalProps {
  projectId: string;
}

const AddProjectStage: React.FC<AddProjectStageProps> = ({
  open,
  onClose,
  projectId,
}) => {
  const [stageName, setStageName] = useState("");

  const utils = api.useUtils();

  const { mutate: craeteStage } = api.projectStage.create.useMutation({
    onSuccess: () => {
      utils.projectStage.invalidate();
      onClose();
      setStageName("");
    },
  });

  const { errors, validate } = useValidation({
    schema: addStageSchema,
    onSuccess: (stage) => {
      craeteStage(stage);
    },
  });

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title="Dodaj"
      subtitle="Nowy etap projektu"
    >
      <div className="mt-4 flex flex-col gap-y-4">
        <Input
          value={stageName}
          onChange={(e) => setStageName(e.target.value)}
          variant="border_label"
          placeholder="Etap I"
          label={<div className="text-xs font-semibold">Nazwa etapu</div>}
          error={errors?.name?._errors}
        />
      </div>
      <div className="flex justify-end gap-x-4">
        <Button
          onClick={() => validate({ projectId, name: stageName })}
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
