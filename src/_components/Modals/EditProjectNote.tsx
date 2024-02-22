import { useState } from "react";
import ActionModal from "../ActionModal";
import Input from "../Input";
import { ProjectNote } from "@prisma/client";
import TextArea from "../TextArea";
import Button from "../Button";
import { useValidation } from "@/utils/hooks";
import { noteSchema } from "@/utils/validation";
import { api } from "@/utils/api";

interface EditProjectNoteProps {
  note: ProjectNote;
  open: boolean;
  onClose: Function;
}

const EditProjectNote: React.FC<EditProjectNoteProps> = ({
  note,
  open,
  onClose,
}) => {
  const [editNote, setEditNote] = useState<ProjectNote>(note);

  const utils = api.useUtils();

  const { mutate: edit } = api.note.edit.useMutation({
    onSuccess: (_data, newNoteData) => {
      utils.note.invalidate();
      onClose();
      setEditNote(newNoteData);
    },
  });

  const { validate, errors } = useValidation({
    schema: noteSchema,
    onSuccess: (note) => {
      edit(note);
    },
  });

  const handleClose = () => {
    onClose();
    setEditNote(note);
  }

  return (
    <ActionModal
      open={open}
      onClose={handleClose}
      title="Edytuj"
      subtitle="Notatka na temat projektu"
    >
      <div className="text-[11px]">DANE PODSTAWOWE</div>
      <div className="mt-4 flex flex-col gap-y-4">
        <Input
          value={editNote.category}
          onChange={(e) =>
            setEditNote({ ...editNote, category: e.target.value })
          }
          variant="border_label"
          placeholder="ważne, pomieszczenia, inspiracje"
          label={<div className="text-xs font-semibold">Kategoria</div>}
          error={errors?.category?._errors}
        />
        <TextArea
          variant="border_label"
          placeholder="Dodatkowe dane o projekcie"
          value={editNote.content}
          label={
            <div className="text-xs font-semibold !leading-[6px]">Notatka</div>
          }
          onChange={(e) =>
            setEditNote({ ...editNote, content: e.target.value })
          }
          error={errors?.content?._errors}
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
          onClick={() => validate(editNote)}
          variant="defualt"
          className="mt-9 w-full rounded-full border-0 bg-archi-purple px-5 py-2 text-center font-semibold text-white shadow-double md:w-fit"
        >
          Edytuj
        </Button>
      </div>
    </ActionModal>
  );
};

export default EditProjectNote;
