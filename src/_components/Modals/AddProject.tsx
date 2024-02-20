import { projectSchema } from "@/utils/validation";
import Input from "@/_components/Input";
import { useState } from "react";
import Button from "@/_components/Button";
import { useValidation } from "@/utils/hooks";
import { api } from "@/utils/api";
import ActionModal from "../ActionModal";

interface AddProjectProps {
  open: boolean;
  onClose: Function;
  className?: string;
}

const AddProject: React.FC<AddProjectProps> = ({ open, onClose }) => {
  const [newProject, setNewProject] = useState({
    name: "",
    clientName: "",
    address: "",
    city: "",
    phoneNumber: "",
    email: "",
  });

  const utils = api.useUtils();

  const { mutate: createProject } = api.project.create.useMutation({
    onSuccess: () => {
      utils.project.getAll.invalidate();
      onClose();
    },
  });

  const { validate, errors } = useValidation<typeof newProject>({
    schema: projectSchema,
    onSuccess: (newProject) => {
      createProject(newProject);
    },
  });

  return (
    <ActionModal onClose={onClose} open={open} title="Dodaj projekt">
      <div className="text-[11px]">DANE PODSTAWOWE</div>
      <div className="mt-4 flex flex-col gap-y-4">
        <Input
          value={newProject.name}
          onChange={(e) =>
            setNewProject({ ...newProject, name: e.target.value })
          }
          variant="border_label"
          placeholder="imię, miasto"
          label={<div className="text-xs font-semibold">Nazwa</div>}
          error={errors?.name?._errors}
        />
        <Input
          value={newProject.clientName}
          onChange={(e) =>
            setNewProject({ ...newProject, clientName: e.target.value })
          }
          variant="border_label"
          placeholder="imię i nazwisko"
          label={<div className="text-xs font-semibold">Imię i nazwisko</div>}
          error={errors?.clientName?._errors}
        />
        <Input
          value={newProject.address}
          onChange={(e) =>
            setNewProject({ ...newProject, address: e.target.value })
          }
          variant="border_label"
          placeholder="ul. Mickiewicza 14"
          label={<div className="text-xs font-semibold">Adres projektu</div>}
          error={errors?.address?._errors}
        />
        <Input
          value={newProject.city}
          onChange={(e) =>
            setNewProject({ ...newProject, city: e.target.value })
          }
          variant="border_label"
          placeholder="Gliwice"
          label={<div className="text-xs font-semibold">Miasto</div>}
          error={errors?.city?._errors}
        />
      </div>
      <div className="mt-8 text-[11px]">DANE KONTAKTOWE</div>
      <div className="mt-4 flex flex-col gap-y-4">
        <Input
          value={newProject.phoneNumber}
          onChange={(e) =>
            setNewProject({ ...newProject, phoneNumber: e.target.value })
          }
          variant="border_label"
          placeholder="xxx xxx xxx"
          label={<div className="text-xs font-semibold">Numer telefonu</div>}
          error={errors?.phoneNumber?._errors}
        />
        <Input
          value={newProject.email}
          onChange={(e) =>
            setNewProject({ ...newProject, email: e.target.value })
          }
          variant="border_label"
          placeholder="example@example.com"
          label={<div className="text-xs font-semibold">Adres e-mail</div>}
          error={errors?.email?._errors}
        />
      </div>
      <div className="flex justify-end gap-x-4">
        <Button
          onClick={() => validate(newProject)}
          variant="defualt"
          className="mt-9 w-full rounded-full border-0 bg-archi-purple px-5 py-2 text-center font-medium text-white shadow-double md:w-fit"
        >
          Dodaj projekt
        </Button>
      </div>
    </ActionModal>
  );
};

export default AddProject;
