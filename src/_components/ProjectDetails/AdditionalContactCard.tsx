import { AdditionalContact } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import ContextMenu from "../ContextMenu";
import { useMemo, useState } from "react";
import { ContextMenuItem } from "@/utils/types";
import EditAdditionalContacts from "../Modals/EditAdditionalContact";

interface AdditionalContactCardProps {
  contact: AdditionalContact;
}

const AdditionalContactCard: React.FC<AdditionalContactCardProps> = ({
  contact,
}) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const additionalContactContextMenuItems: ContextMenuItem[] = useMemo(() => [
    {
      displayName: "Edytuj",
      key: "edit",
      onClick: () => setOpenEdit(true)
    },
    {
      displayName: "Usuń",
      key: "delete",
      onClick: () => setOpenDelete(true)
    }
  ], []);

  return (
    <>
      <EditAdditionalContacts 
        contact={contact}
        open={openEdit}
        onClose={() => setOpenEdit(false)}
      />
      <section>
        <div className="flex justify-between">
          <p className="text-sm font-semibold leading-[14px] text-archi-purple">
            {contact.occupation}
          </p>
          <ContextMenu menuItems={additionalContactContextMenuItems}>
            <MoreHorizontal />
          </ContextMenu>
        </div>
        <div className="text-[14px] leading-[18px]">
          <p className="text-[10px] font-semibold leading-[18px]">DANE</p>
          <p>{contact.name}</p>
          <p>{contact.phoneNumber}</p>
          <p>{contact.email}</p>
        </div>
        {!!contact.note.length && (
          <div className="mt-1 text-[14px] leading-[18px]">
            <p className="text-[10px] font-semibold leading-[18px]">NOTATKI</p>
            <p>{contact.note}</p>
          </div>
        )}
      </section>
    </>
  );
};

export default AdditionalContactCard;
