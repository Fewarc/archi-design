import { ContextMenuItem } from "@/utils/types";
import { ProjectNote } from "@prisma/client";
import { useMemo, useState } from "react";
import ContextMenu from "../ContextMenu";
import { MoreHorizontal } from "lucide-react";
import EditProjectNote from "../Modals/EditProjectNote";
import { set } from "node_modules/cypress/types/lodash";

interface ProjectNoteCardProps {
  note: ProjectNote;
}

const ProjectNoteCard: React.FC<ProjectNoteCardProps> = ({ note }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const noteContextMenuItems: ContextMenuItem[] = useMemo(
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
      <EditProjectNote
        note={note}
        open={openEdit}
        onClose={() => setOpenEdit(false)}
      />
      <section>
        <div className="flex justify-between">
          <p className="text-[10px] font-semibold leading-[18px]">
            {note.category}
          </p>
          <ContextMenu menuItems={noteContextMenuItems}>
            <MoreHorizontal />
          </ContextMenu>
        </div>
        <div className="text-[14px] leading-[18px]">
          <p>{note.content}</p>
        </div>
      </section>
    </>
  );
};

export default ProjectNoteCard;
