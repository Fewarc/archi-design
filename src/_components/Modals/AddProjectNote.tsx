import ActionModal from "../ActionModal";
import Input from "../Input";
import TextArea from "../TextArea";
import { addNoteSchema } from "@/utils/validation";
import Button from "../Button";
import { api } from "@/utils/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface AddProjectNoteProps {
  projectId: string;
  open: boolean;
  onClose: Function;
}

type AddProjectNoteSchemaType = z.infer<typeof addNoteSchema>;

const AddProjectNote: React.FC<AddProjectNoteProps> = ({
  open,
  onClose,
  projectId,
}) => {
  const utils = api.useUtils();

  const { mutate: createNote } = api.note.create.useMutation({
    onSuccess: () => {
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
  } = useForm<AddProjectNoteSchemaType>({
    resolver: zodResolver(addNoteSchema),
    defaultValues: {
      projectId,
    },
  });

  const onSubmit: SubmitHandler<AddProjectNoteSchemaType> = (data) =>
    createNote(data);

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title="Dodaj"
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
            type="submit"
            variant="defualt"
            className="mt-9 w-full rounded-full border-0 bg-archi-purple px-5 py-2 text-center font-medium text-white shadow-double md:w-fit"
          >
            Dodaj
          </Button>
        </div>
      </form>
    </ActionModal>
  );
};

export default AddProjectNote;
