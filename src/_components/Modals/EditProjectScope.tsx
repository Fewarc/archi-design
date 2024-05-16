import { ModalProps } from "@/utils/types";
import { ProjectScope } from "@prisma/client";
import ActionModal from "../ActionModal";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { projectScopeSchema } from "@/utils/validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../Input";
import ItemDropdown from "../ItemDropdown";
import { ScopeCategories } from "@/utils/items";
import Button from "../Button";
import { api } from "@/utils/api";
import { useEffect } from "react";

interface EditProjectScopeProps extends ModalProps {
  scope: ProjectScope | null;
}

type EditProjectScopeSchemaType = z.infer<typeof projectScopeSchema>;

const EditProjectScope: React.FC<EditProjectScopeProps> = ({
  scope,
  open,
  onClose,
}) => {
  const utils = api.useUtils();

  const { mutate: editScope } = api.projectScope.edit.useMutation({
    onSuccess: () => {
      utils.projectScope.invalidate();
      onClose();
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<EditProjectScopeSchemaType>({
    resolver: zodResolver(projectScopeSchema),
    defaultValues: {
      ...scope,
    },
  });

  const onSubmit: SubmitHandler<EditProjectScopeSchemaType> = (data) => {
    editScope(data);
  };

  useEffect(() => {
    !!scope && reset(scope);
  }, [scope]);

  return (
    <ActionModal
      title="Edytuj"
      subtitle={`Zakres "${scope?.name}"`}
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
            onClick={() => onClose()}
            variant="defualt"
            className="mt-9 w-full rounded-full border-0 bg-archi-purple-light px-5 py-2 text-center font-semibold text-archi-purple shadow-double md:w-fit"
          >
            Anuluj
          </Button>
          <Button
            type="submit"
            variant="defualt"
            className="mt-9 w-full rounded-full border-0 bg-archi-purple px-5 py-2 text-center font-medium text-white shadow-double md:w-fit"
          >
            Edytuj
          </Button>
        </div>
      </form>
    </ActionModal>
  );
};

export default EditProjectScope;
