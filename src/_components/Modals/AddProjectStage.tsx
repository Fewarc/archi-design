import { ModalProps } from "@/utils/types";
import ActionModal from "../ActionModal";
import Button from "../Button";
import Input from "../Input";
import { addStageSchema } from "@/utils/validation";
import { api } from "@/utils/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

interface AddProjectStageProps extends ModalProps {
  projectId: string;
}

type AddStageSchemaType = z.infer<typeof addStageSchema>;

const AddProjectStage: React.FC<AddProjectStageProps> = ({
  open,
  onClose,
  projectId,
}) => {
  const utils = api.useUtils();

  const { mutate: craeteStage } = api.projectStage.create.useMutation({
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
  } = useForm<AddStageSchemaType>({
    resolver: zodResolver(addStageSchema),
    defaultValues: {
      projectId,
    },
  });

  const onSubmit: SubmitHandler<AddStageSchemaType> = (data) =>
    craeteStage(data);

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title="Dodaj"
      subtitle="Nowy etap projektu"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 flex flex-col gap-y-4">
          <Input
            variant="border_label"
            placeholder="Etap I"
            label={<div className="text-xs font-semibold">Nazwa etapu</div>}
            error={errors?.name?.message}
            {...register("name")}
          />
        </div>
        <div className="flex justify-end gap-x-4">
          <Button
            type="submit"
            variant="defualt"
            className="mt-9 w-full rounded-full border-0 bg-archi-purple px-5 py-2 text-center font-medium text-white shadow-double md:w-fit"
          >
            Dodaj
          </Button>
        </div>
      </form>
    </ActionModal>
  );
};

export default AddProjectStage;
