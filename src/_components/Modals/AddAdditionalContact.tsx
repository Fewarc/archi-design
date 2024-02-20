import { useMediaQuery, useValidation2 } from "@/utils/hooks";
import Button from "../Button";
import Input from "../Input";
import { useState } from "react";
import { additionalContactSchema } from "@/utils/validation";
import TextArea from "../TextArea";
import { api } from "@/utils/api";
import ActionModal from "../ActionModal";
import { AdditionalContact } from "@prisma/client";

interface AddAdditionalContactProps {
  projectId: string;
  open: boolean;
  onClose: Function;
}

const AddAdditionalContact: React.FC<AddAdditionalContactProps> = ({
  projectId,
  open,
  onClose,
}) => {
  const [newContact, setNewContact] = useState({
    name: "",
    occupation: "",
    phoneNumber: "",
    email: "",
    note: "",
    projectId: projectId,
  });

  const { mutate: createAdditionalContact } =
    api.additionalContact.create.useMutation({
      onSuccess: () => {
        // TODO: invalidate additional contacts
        onClose();
        clearData();
      },
    });

  const { errors, validate } = useValidation2<typeof newContact>({
    schema: additionalContactSchema,
    onSuccess: () => {
      createAdditionalContact(newContact);
    },
  });

  function clearData() {
    setNewContact({
      ...newContact,
      name: "",
      occupation: "",
      phoneNumber: "",
      email: "",
      note: "",
    });
  }

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title="Dodaj"
      subtitle="Dodatkowe dane kontaktowe"
    >
      <div className="text-[11px]">DANE PODSTAWOWE</div>
      <div className="mt-4 flex flex-col gap-y-4">
        <Input
          value={newContact.name}
          onChange={(e) =>
            setNewContact({ ...newContact, name: e.target.value })
          }
          variant="border_label"
          placeholder="imię i nazwisko"
          label={<div className="text-xs font-semibold">Imię i nazwisko</div>}
          error={errors?.name?._errors}
        />
        <Input
          value={newContact.occupation}
          onChange={(e) =>
            setNewContact({ ...newContact, occupation: e.target.value })
          }
          variant="border_label"
          placeholder="stolarz, wykonawca"
          label={<div className="text-xs font-semibold">Funkcja</div>}
          error={errors?.name?._errors}
        />
      </div>
      <div className="mt-8 text-[11px]">DANE KONTAKTOWE</div>
      <div className="mt-4 flex flex-col gap-y-4">
        <Input
          value={newContact.phoneNumber}
          onChange={(e) =>
            setNewContact({ ...newContact, phoneNumber: e.target.value })
          }
          variant="border_label"
          placeholder="xxx xxx xxx"
          label={<div className="text-xs font-semibold">Numer telefonu</div>}
          error={errors?.phoneNumber?._errors}
        />
        <Input
          value={newContact.email}
          onChange={(e) =>
            setNewContact({ ...newContact, email: e.target.value })
          }
          variant="border_label"
          placeholder="example@example.com"
          label={<div className="text-xs font-semibold">Adres e-mail</div>}
          error={errors?.email?._errors}
        />
      </div>
      <div className="mt-8 text-[11px]">INFORAMCJA DODATKOWE</div>
      <div className="mt-4 flex flex-col gap-y-4">
        <TextArea
          variant="border_label"
          value={newContact.note}
          label={
            <div className="text-xs font-semibold !leading-[6px]">Notatki</div>
          }
          onChange={(e) =>
            setNewContact({ ...newContact, note: e.target.value })
          }
        />
      </div>
      <Button
        onClick={() => validate({ ...newContact, projectId })}
        variant="defualt"
        className="mt-9 w-full rounded-full border-0 bg-archi-purple px-5 py-2 text-center font-medium text-white shadow-double"
      >
        Dodaj
      </Button>
    </ActionModal>
  );
};

export default AddAdditionalContact;
