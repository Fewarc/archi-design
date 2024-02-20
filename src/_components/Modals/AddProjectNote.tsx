import { useState } from "react";
import ActionModal from "../ActionModal";
import Input from "../Input";
import TextArea from "../TextArea";
import { useValidation } from "@/utils/hooks";
import { newNoteSchema } from "@/utils/validation";
import Button from "../Button";
import { api } from "@/utils/api";

interface AddProjectNoteProps {
  projectId: string;
  open: boolean;
  onClose: Function;
}

const AddProjectNote: React.FC<AddProjectNoteProps> = ({
  open,
  onClose,
  projectId,
}) => {
  const [newNote, setNewNote] = useState({
    category: "",
    content: "",
    projectId: projectId,
  });

  const utils = api.useUtils();

  const { mutate: createNote } = api.note.create.useMutation({
    onSuccess: () => {
      utils.note.invalidate();
      onClose();
    },
  });

  const { errors, validate } = useValidation({
    schema: newNoteSchema,
    onSuccess: () => {
      createNote(newNote);
    },
  });

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title="Dodaj"
      subtitle="Notatka na temat projektu"
    >
      <div className="text-[11px]">DANE PODSTAWOWE</div>
      <div className="mt-4 flex flex-col gap-y-4">
        <Input
          value={newNote.category}
          onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
          variant="border_label"
          placeholder="ważne, pomieszczenia, inspiracje"
          label={<div className="text-xs font-semibold">Kategoria</div>}
          error={errors?.category?._errors}
        />
        <TextArea
          variant="border_label"
          placeholder="Dodatkowe dane o projekcie"
          value={newNote.content}
          label={
            <div className="text-xs font-semibold !leading-[6px]">Notatka</div>
          }
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
        />
      </div>
      <div className="flex justify-end gap-x-4">
        <Button
          onClick={() => validate(newNote)}
          variant="defualt"
          className="mt-9 w-full rounded-full border-0 bg-archi-purple px-5 py-2 text-center font-medium text-white shadow-double md:w-fit"
        >
          Dodaj
        </Button>
      </div>
    </ActionModal>
  );
};

export default AddProjectNote;
