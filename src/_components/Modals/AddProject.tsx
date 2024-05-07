import { addProjectSchema } from "@/utils/validation";
import Input from "@/_components/Input";
import { useEffect, useState } from "react";
import Button from "@/_components/Button";
import { useValidation } from "@/utils/hooks";
import { api } from "@/utils/api";
import ActionModal from "../ActionModal";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { ModalProps } from "@/utils/types";

interface AddProjectProps extends ModalProps {
  teamId: string;
}

type ProjectSchemaType = z.infer<typeof addProjectSchema>;

const AddProject: React.FC<AddProjectProps> = ({ open, onClose, teamId }) => {
  const utils = api.useUtils();

  const { mutate: createProject } = api.project.create.useMutation({
    onSuccess: () => {
      utils.project.getAll.invalidate();
      onClose();
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProjectSchemaType>({
    resolver: zodResolver(addProjectSchema),
  });

  const onSubmit: SubmitHandler<ProjectSchemaType> = (data) =>
    createProject({ ...data, teamId });

  return (
    <ActionModal onClose={onClose} open={open} title="Dodaj projekt">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-[11px]">DANE PODSTAWOWE</div>
        <div className="mt-4 flex flex-col gap-y-4">
          <Input
            variant="border_label"
            placeholder="imię, miasto"
            label={<div className="text-xs font-semibold">Nazwa</div>}
            error={errors?.name?.message}
            {...register("name")}
          />
          <Input
            variant="border_label"
            placeholder="imię i nazwisko"
            label={<div className="text-xs font-semibold">Imię i nazwisko</div>}
            error={errors?.clientName?.message}
            {...register("clientName")}
          />
          <Input
            variant="border_label"
            placeholder="ul. Mickiewicza 14"
            label={<div className="text-xs font-semibold">Adres projektu</div>}
            error={errors?.address?.message}
            {...register("address")}
          />
          <Input
            variant="border_label"
            placeholder="Gliwice"
            label={<div className="text-xs font-semibold">Miasto</div>}
            error={errors?.city?.message}
            {...register("city")}
          />
        </div>
        <div className="mt-8 text-[11px]">DANE KONTAKTOWE</div>
        <div className="mt-4 flex flex-col gap-y-4">
          <Input
            variant="border_label"
            placeholder="xxx xxx xxx"
            label={<div className="text-xs font-semibold">Numer telefonu</div>}
            error={errors?.phoneNumber?.message}
            {...register("phoneNumber")}
          />
          <Input
            variant="border_label"
            placeholder="example@example.com"
            label={<div className="text-xs font-semibold">Adres e-mail</div>}
            error={errors?.email?.message}
            {...register("email")}
          />
        </div>
        <div className="flex justify-end gap-x-4">
          <Button
            type="submit"
            variant="defualt"
            className="mt-9 w-full rounded-full border-0 bg-archi-purple px-5 py-2 text-center font-medium text-white shadow-double md:w-fit"
          >
            Dodaj projekt
          </Button>
        </div>
      </form>
    </ActionModal>
  );
};

export default AddProject;
