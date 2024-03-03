import { editProjectSchema, projectSchema } from "@/utils/validation";
import Input from "@/_components/Input";
import { useState } from "react";
import Button from "@/_components/Button";
import { useValidation } from "@/utils/hooks";
import { api } from "@/utils/api";
import ActionModal from "../ActionModal";
import { Project } from "@prisma/client";

interface EditProjectDetialsProps {
  project: Project;
  open: boolean;
  onClose: Function;
}

const EditProjectDetials: React.FC<EditProjectDetialsProps> = ({
  project,
  open,
  onClose,
}) => {
  const [editProject, setEditProject] = useState(project);

  const utils = api.useUtils();

  const { mutate: edit } = api.project.edit.useMutation({
    onSuccess: (_data, newProjectData) => {
      utils.project.invalidate();
      onClose();
      setEditProject(newProjectData);
    },
  });

  const { validate, errors } = useValidation<typeof editProject>({
    schema: editProjectSchema,
    onSuccess: (project) => {
      edit(project);
    },
  });

  const handleClose = () => {
    onClose();
    setEditProject(project);
  };

  return (
    <ActionModal
      onClose={handleClose}
      open={open}
      title="Edytuj"
      subtitle="Podstawowe dane o projekcie"
    >
      <div className="text-[11px]">DANE PODSTAWOWE</div>
      <div className="mt-4 flex flex-col gap-y-4">
        <Input
          value={editProject.name}
          onChange={(e) =>
            setEditProject({ ...editProject, name: e.target.value })
          }
          variant="border_label"
          placeholder="imię, miasto"
          label={<div className="text-xs font-semibold">Nazwa</div>}
          error={errors?.name?._errors}
        />
        <Input
          value={editProject.clientName}
          onChange={(e) =>
            setEditProject({ ...editProject, clientName: e.target.value })
          }
          variant="border_label"
          placeholder="imię i nazwisko"
          label={<div className="text-xs font-semibold">Imię i nazwisko</div>}
          error={errors?.clientName?._errors}
        />
        <Input
          value={editProject.address}
          onChange={(e) =>
            setEditProject({ ...editProject, address: e.target.value })
          }
          variant="border_label"
          placeholder="ul. Mickiewicza 14"
          label={<div className="text-xs font-semibold">Adres projektu</div>}
          error={errors?.address?._errors}
        />
        <Input
          value={editProject.city}
          onChange={(e) =>
            setEditProject({ ...editProject, city: e.target.value })
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
          value={editProject.phoneNumber}
          onChange={(e) =>
            setEditProject({ ...editProject, phoneNumber: e.target.value })
          }
          variant="border_label"
          placeholder="xxx xxx xxx"
          label={<div className="text-xs font-semibold">Numer telefonu</div>}
          error={errors?.phoneNumber?._errors}
        />
        <Input
          value={editProject.email}
          onChange={(e) =>
            setEditProject({ ...editProject, email: e.target.value })
          }
          variant="border_label"
          placeholder="example@example.com"
          label={<div className="text-xs font-semibold">Adres e-mail</div>}
          error={errors?.email?._errors}
        />
      </div>
      <div className="flex justify-end gap-x-4">
        <Button
          onClick={() => handleClose()}
          variant="defualt"
          className="mt-9 w-full rounded-full border-0 bg-archi-purple-light px-5 py-2 text-center font-semibold text-archi-purple shadow-double md:w-fit"
        >
          Anuluj
        </Button>
        <Button
          onClick={() => validate(editProject)}
          variant="defualt"
          className="mt-9 w-full rounded-full border-0 bg-archi-purple px-5 py-2 text-center font-semibold text-white shadow-double md:w-fit"
        >
          Edytuj
        </Button>
      </div>
    </ActionModal>
  );
};

export default EditProjectDetials;
