import { AdditionalContact } from "@prisma/client";
import { AtSign, MoreHorizontal, Phone, PhoneCall } from "lucide-react";
import ContextMenu from "./ContextMenu";
import { useMemo, useState } from "react";
import { ContextMenuItem } from "@/utils/types";
import EditAdditionalContacts from "./Modals/EditAdditionalContact";
import DeleteModal from "./Modals/DeleteModal";
import { api } from "@/utils/api";

interface AdditionalContactCardProps {
  contact: AdditionalContact;
}

const AdditionalContactCard: React.FC<AdditionalContactCardProps> = ({
  contact,
}) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const utils = api.useUtils();

  const { mutate: deleteContact } = api.additionalContact.delete.useMutation({
    onSuccess: () => {
      utils.additionalContact.invalidate();
    },
  });

  const additionalContactContextMenuItems: ContextMenuItem[] = useMemo(
    () => [
      {
        displayName: "Edytuj",
        key: "edit",
        onClick: () => setOpenEdit(true),
      },
      {
        displayName: "Usuń",
        key: "delete",
        onClick: () => setOpenDelete(true),
      },
    ],
    [],
  );

  return (
    <>
      <EditAdditionalContacts
        contact={contact}
        open={openEdit}
        onClose={() => setOpenEdit(false)}
      />
      <DeleteModal
        modalTitle={`Czy na pewno chcesz usunąć ten kontakt?`}
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onDelete={() => deleteContact({ contactId: contact.id })}
      >
        Kontakt "{contact.name}" zostanie trwale usunięty ze wszystkich kont,
        które mają do niej dostęp
      </DeleteModal>
      <section>
        <div className="flex justify-between">
          <p className="text-sm font-semibold leading-[14px] text-archi-purple md:text-base md:leading-[18px]">
            {contact.occupation}
          </p>
          <ContextMenu menuItems={additionalContactContextMenuItems}>
            <MoreHorizontal />
          </ContextMenu>
        </div>
        <p className="hidden text-xl font-bold leading-6 md:inline">
          {contact.name}
        </p>
        <div className="md:mt-3 md:flex">
          <div className="text-[14px] leading-[18px] md:w-1/2 md:text-base">
            <p className="mb-2 text-[10px] font-semibold leading-[18px] text-archi-gray md:text-xs">
              DANE
            </p>
            <p className="md:hidden">{contact.name}</p>
            <div className="flex items-center gap-x-3">
              <Phone className="hidden md:inline" />
              <p>{contact.phoneNumber}</p>
            </div>
            <div className="flex items-center gap-x-3 md:mt-3">
              <AtSign className="hidden md:inline" />
              <p>{contact.email}</p>
            </div>
          </div>
          {!!contact.note.length && (
            <div className="mt-1 text-[14px] leading-[18px] md:w-1/2 md:text-base">
              <p className="mb-2 text-[10px] font-semibold leading-[18px] text-archi-gray md:text-xs">
                NOTATKI
              </p>
              <p>{contact.note}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default AdditionalContactCard;
