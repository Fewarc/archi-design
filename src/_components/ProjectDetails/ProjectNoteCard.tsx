import { ContextMenuItem } from "@/utils/types";
import { ProjectNote } from "@prisma/client";
import { RefObject, useEffect, useMemo, useRef, useState } from "react";
import ContextMenu from "../ContextMenu";
import { MoreHorizontal } from "lucide-react";
import EditProjectNote from "../Modals/EditProjectNote";
import Button from "../Button";
import { cn } from "@/utils/styleUtils";
import { useIsClamped } from "@/utils/hooks";

interface ProjectNoteCardProps {
  note: ProjectNote;
}

const ProjectNoteCard: React.FC<ProjectNoteCardProps> = ({ note }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const isClamped = useIsClamped(contentRef);

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
          <p className="text-[10px] font-semibold leading-[18px] md:mb-4 md:text-xs">
            {note.category}
          </p>
          <ContextMenu menuItems={noteContextMenuItems}>
            <MoreHorizontal />
          </ContextMenu>
        </div>
        <div
          className={cn("text-[14px] leading-[18px]", {
            "line-clamp-6": !readMore,
          })}
          ref={contentRef}
        >
          <p>{note.content}</p>
        </div>
        <div className="mt-4 flex justify-end">
          {(isClamped || readMore) && (
            <Button
              variant="link"
              onClick={() => setReadMore(!readMore)}
              className="text-base font-semibold leading-5 text-archi-purple"
            >
              {readMore ? "Czytaj mniej" : "Czytaj więcej"}
            </Button>
          )}
        </div>
      </section>
    </>
  );
};

export default ProjectNoteCard;
