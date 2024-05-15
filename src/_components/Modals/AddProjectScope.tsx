import { ItemDropdownItem, ModalProps } from "@/utils/types";
import ActionModal from "../ActionModal";
import Button from "../Button";
import { addProjectScopeSchema } from "@/utils/validation";
import { z } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../Input";
import { api } from "@/utils/api";
import ItemDropdown from "../ItemDropdown";
import { ProjectScopeCategory } from "@prisma/client";

interface AddProjectScopeProps extends ModalProps {
  projectId: string;
}

export const ScopeCategories: ItemDropdownItem[] = [
  {
    displayName: "Koncepcyjny",
    key: ProjectScopeCategory.CONCEPTUAL,
  },
  {
    displayName: "Kompleksowy",
    key: ProjectScopeCategory.COMPREHENSIVE,
  },
];

type AddProjectScopeSchmeaType = z.infer<typeof addProjectScopeSchema>;

const AddProjectScope: React.FC<AddProjectScopeProps> = ({
  projectId,
  open,
  onClose,
}) => {
  const utils = api.useUtils();

  const { mutate: createScope } = api.projectScope.create.useMutation({
    onSuccess: () => {
      utils.projectScope.invalidate();
      onClose();
      reset();
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<AddProjectScopeSchmeaType>({
    resolver: zodResolver(addProjectScopeSchema),
    defaultValues: {
      projectId,
    },
  });

  const onSubmit: SubmitHandler<AddProjectScopeSchmeaType> = (data) => {
    createScope(data);
  };

  return (
    <ActionModal
      title="Dodaj"
      subtitle="Nowy zakres projektu"
      onClose={onClose}
      open={open}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-[11px]">DANE PODSTAWOWE</div>
        <div className="mt-4 flex flex-col gap-y-4">
          <Input
            variant="border_label"
            placeholder="kuchnia"
            label={<div className="text-xs font-semibold">Nazwa</div>}
            error={errors?.name?.message}
            {...register("name")}
          />
          <Input
            variant="border_label"
            placeholder="20"
            label={
              <div className="text-xs font-semibold">Powierzchnia w m2</div>
            }
            error={errors?.surface?.message}
            type="number"
            {...register("surface", { valueAsNumber: true })}
          />
          <Controller
            name="category"
            control={control}
            defaultValue="CONCEPTUAL"
            render={({ field }) => (
              <ItemDropdown
                items={ScopeCategories}
                handleChange={(item) => field.onChange(item.key)}
                variant="border"
                {...field}
              />
            )}
          />

          <Input
            variant="border_label"
            placeholder="100"
            label={<div className="text-xs font-semibold">Koszt za m2</div>}
            error={errors?.price?.message}
            type="number"
            {...register("price", { valueAsNumber: true })}
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

export default AddProjectScope;
