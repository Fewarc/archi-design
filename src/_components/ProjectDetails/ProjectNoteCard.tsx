import { ContextMenuItem } from "@/utils/types";
import { ProjectNote } from "@prisma/client";
import { useMemo, useRef, useState } from "react";
import ContextMenu from "../ContextMenu";
import { MoreHorizontal } from "lucide-react";
import EditProjectNote from "../Modals/EditProjectNote";
import Button from "../Button";
import { cn } from "@/utils/styleUtils";
import { useIsClamped } from "@/utils/hooks";
import DeleteModal from "../Modals/DeleteModal";
import { api } from "@/utils/api";

interface ProjectNoteCardProps {
  note: ProjectNote;
}

const getShortenedNote = (noteContent: string) => {
  const splitNote = noteContent.split(" ");
  if (splitNote[0]?.length) {
    if (splitNote[0]?.length > 20) {
      return splitNote[0];
    } else {
      return splitNote.slice(0, 3).join(" ");
    }
  }

  return noteContent;
};

const ProjectNoteCard: React.FC<ProjectNoteCardProps> = ({ note }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const isClamped = useIsClamped(contentRef);

  const utils = api.useUtils();

  const { mutate: deleteNote } = api.note.delete.useMutation({
    onSuccess: () => {
      utils.note.invalidate();
    },
  });

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
      <DeleteModal
        modalTitle={`Czy na pewno chcezs usunąć tę notatkę?`}
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onDelete={() => deleteNote({ noteId: note.id })}
      >
        Notatka "{getShortenedNote(note.content)}..." zostanie trwale usunięta
        ze wszystkich kont, które mają do niej dostęp
      </DeleteModal>
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
          className={cn("text-[14px] leading-[18px] md:text-base", {
            "line-clamp-6": !readMore,
          })}
          ref={contentRef}
        >
          <p className="text-justify">{note.content}</p>
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
