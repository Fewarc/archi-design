import ActionModal from "../ActionModal";
import Input from "../Input";
import { ProjectNote } from "@prisma/client";
import TextArea from "../TextArea";
import Button from "../Button";
import { noteSchema } from "@/utils/validation";
import { api } from "@/utils/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface EditProjectNoteProps {
  note: ProjectNote;
  open: boolean;
  onClose: Function;
}

type EditProjectNoteSchemaType = z.infer<typeof noteSchema>;

const EditProjectNote: React.FC<EditProjectNoteProps> = ({
  note,
  open,
  onClose,
}) => {
  const utils = api.useUtils();

  const { mutate: edit } = api.note.edit.useMutation({
    onSuccess: (_data) => {
      utils.note.invalidate();
      onClose();
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<EditProjectNoteSchemaType>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      ...note,
    },
  });

  const onSubmit: SubmitHandler<EditProjectNoteSchemaType> = (data) =>
    edit(data);

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title="Edytuj"
      subtitle="Notatka na temat projektu"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-[11px]">DANE PODSTAWOWE</div>
        <div className="mt-4 flex flex-col gap-y-4">
          <Input
            variant="border_label"
            placeholder="ważne, pomieszczenia, inspiracje"
            label={<div className="text-xs font-semibold">Kategoria</div>}
            error={errors?.category?.message}
            {...register("category")}
          />
          <Controller
            name="content"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextArea
                variant="border_label"
                placeholder="Dodatkowe dane o projekcie"
                label={
                  <div className="text-xs font-semibold !leading-[6px]">
                    Notatka
                  </div>
                }
                {...field}
              />
            )}
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
            type="submit"
            variant="defualt"
            className="mt-9 w-full rounded-full border-0 bg-archi-purple px-5 py-2 text-center font-semibold text-white shadow-double md:w-fit"
          >
            Edytuj
          </Button>
        </div>
      </form>
    </ActionModal>
  );
};

export default EditProjectNote;
