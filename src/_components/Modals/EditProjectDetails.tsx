import { editProjectSchema, projectSchema } from "@/utils/validation";
import Input from "@/_components/Input";
import Button from "@/_components/Button";
import { api } from "@/utils/api";
import ActionModal from "../ActionModal";
import { Project } from "@prisma/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

interface EditProjectDetialsProps {
  project: Project;
  open: boolean;
  onClose: Function;
}

type EditProjectSchmeaType = z.infer<typeof editProjectSchema>;

const EditProjectDetials: React.FC<EditProjectDetialsProps> = ({
  project,
  open,
  onClose,
}) => {
  const utils = api.useUtils();

  const { mutate: edit } = api.project.edit.useMutation({
    onSuccess: (_data, newProjectData) => {
      utils.project.invalidate();
      onClose();
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EditProjectSchmeaType>({
    resolver: zodResolver(editProjectSchema),
    defaultValues: {
      ...project,
    },
  });

  const onSubmit: SubmitHandler<EditProjectSchmeaType> = (data) => edit(data);

  return (
    <ActionModal
      onClose={onClose}
      open={open}
      title="Edytuj"
      subtitle="Podstawowe dane o projekcie"
    >
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
            onClick={() => onClose()}
            variant="defualt"
            className="mt-9 w-full rounded-full border-0 bg-archi-purple-light px-5 py-2 text-center font-semibold text-archi-purple shadow-double md:w-fit"
          >
            Anuluj
          </Button>
          <Button
            type="submit"
            variant="defualt"
            className="mt-9 w-full rounded-full border-0 bg-archi-purple px-5 py-2 text-center font-semibold text-white shadow-double md:w-fit"
          >
            Edytuj
          </Button>
        </div>
      </form>
    </ActionModal>
  );
};

export default EditProjectDetials;
