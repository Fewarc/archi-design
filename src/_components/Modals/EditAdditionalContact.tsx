import { useValidation2 } from "@/utils/hooks";
import { AdditionalContact } from "@prisma/client";
import { useState } from "react";
import ActionModal from "../ActionModal";
import { ModalProps } from "@/utils/types";
import Input from "../Input";
import TextArea from "../TextArea";
import Button from "../Button";
import { editAdditionalContactSchema } from "@/utils/validation";
import { api } from "@/utils/api";

interface EditAdditionalContactsProps extends ModalProps {
  contact: AdditionalContact;
  className?: string;
}

const EditAdditionalContacts: React.FC<EditAdditionalContactsProps> = ({
  contact,
  open,
  onClose,
}) => {
  const [editContact, setEditContact] = useState(contact);

  const utils = api.useUtils();

  const { mutate: editAdditionalContact } = api.additionalContact.edit.useMutation({ onSuccess: () => {
    utils.additionalContact.invalidate();
    onClose();
  }});

  const { errors, validate } = useValidation2<typeof editContact>({schema: editAdditionalContactSchema, onSuccess: (contact) => {
    editAdditionalContact(contact);
  }});

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title="Edytuj"
      subtitle="Dodatkowe dane kontaktowe"
    >
      <div className="text-[11px]">DANE PODSTAWOWE</div>
      <div className="mt-4 flex flex-col gap-y-4">
        <Input
          value={editContact.name}
          onChange={(e) =>
            setEditContact({ ...editContact, name: e.target.value })
          }
          variant="border_label"
          placeholder="imię i nazwisko"
          label={<div className="text-xs font-semibold">Imię i nazwisko</div>}
          error={errors?.name?._errors}
        />
        <Input
          value={editContact.occupation}
          onChange={(e) =>
            setEditContact({ ...editContact, occupation: e.target.value })
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
          value={editContact.phoneNumber}
          onChange={(e) =>
            setEditContact({ ...editContact, phoneNumber: e.target.value })
          }
          variant="border_label"
          placeholder="xxx xxx xxx"
          label={<div className="text-xs font-semibold">Numer telefonu</div>}
          error={errors?.phoneNumber?._errors}
        />
        <Input
          value={editContact.email}
          onChange={(e) =>
            setEditContact({ ...editContact, email: e.target.value })
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
          value={editContact.note}
          label={
            <div className="text-xs font-semibold !leading-[6px]">Notatki</div>
          }
          onChange={(e) =>
            setEditContact({ ...editContact, note: e.target.value })
          }
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
          onClick={() => validate(editContact)}
          variant="defualt"
          className="mt-9 w-full rounded-full border-0 bg-archi-purple px-5 py-2 text-center font-semibold text-white shadow-double md:w-fit"
        >
          Edytuj
        </Button>
      </div>
    </ActionModal>
  );
};

export default EditAdditionalContacts;
