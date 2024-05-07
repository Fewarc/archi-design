import { ProjectStage } from "@prisma/client";
import ActionModal from "../ActionModal";
import { ModalProps } from "@/utils/types";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../Input";
import Button from "../Button";
import { api } from "@/utils/api";

interface EditProjectStageProps extends ModalProps {
  stage: ProjectStage | null;
}

const stageRenameSchema = z.object({
  stageName: z.string().min(1, { message: "Pole wymagane." }),
});

type StageRenameSchemaType = z.infer<typeof stageRenameSchema>;

const EditProjectStage: React.FC<EditProjectStageProps> = ({
  stage,
  open,
  onClose,
}) => {
  const utils = api.useUtils();

  const { mutate: renameStage } = api.projectStage.rename.useMutation({
    onSuccess: () => {
      utils.projectStage.invalidate();
      onClose();
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<StageRenameSchemaType>({
    resolver: zodResolver(stageRenameSchema),
  });

  const onSubmit: SubmitHandler<StageRenameSchemaType> = (data) =>
    renameStage({ stageId: stage?.id!, stageName: data.stageName });

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title="Edytuj"
      subtitle={`Nazwa etapu ${stage?.name}`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="h-full">
          <div className="text-[11px]">NOWA NAZWA ETAPU</div>
          <div className="mt-4 flex flex-col gap-y-4">
            <Input
              variant="border_label"
              placeholder="nazwa etapu"
              label={<div className="text-xs font-semibold">Nazwa</div>}
              error={errors.stageName?.message}
              {...register("stageName")}
            />
          </div>
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
            variant="defualt"
            className="mt-9 w-full rounded-full border-0 bg-archi-purple px-5 py-2 text-center font-semibold text-white shadow-double md:w-fit"
            type="submit"
          >
            Edytuj
          </Button>
        </div>
      </form>
    </ActionModal>
  );
};

export default EditProjectStage;
