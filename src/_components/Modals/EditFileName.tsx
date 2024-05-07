import ActionModal from "../ActionModal";
import Input from "../Input";
import Button from "../Button";
import { DriveFile, ModalProps } from "@/utils/types";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/utils/api";

interface EditFileNameProps extends ModalProps {
  file: DriveFile | null;
}

const fileRenameSchema = z.object({
  fileName: z.string().min(1, { message: "Pole wymagane." }),
});

type FileRenameSchemaType = z.infer<typeof fileRenameSchema>;

const EditFileName: React.FC<EditFileNameProps> = ({ file, open, onClose }) => {
  const utils = api.useUtils();

  const { mutate: renameFile } = api.file.rename.useMutation({
    onSuccess: () => {
      utils.projectStage.invalidate();
      onClose();
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FileRenameSchemaType>({
    resolver: zodResolver(fileRenameSchema),
  });

  const onSubmit: SubmitHandler<FileRenameSchemaType> = (data) =>
    renameFile({ fileId: file?.id!, fileName: data.fileName });

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title="Edytuj"
      subtitle="Nazwa pliku"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="h-full">
          <div className="text-[11px]">NOWA NAZWA PLIKU</div>
          <div className="mt-4 flex flex-col gap-y-4">
            <Input
              variant="border_label"
              placeholder="example.pdf"
              label={<div className="text-xs font-semibold">Nazwa</div>}
              error={errors.fileName?.message}
              {...register("fileName")}
            />
          </div>
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
            variant="defualt"
            className="mt-9 w-full rounded-full border-0 bg-archi-purple px-5 py-2 text-center font-semibold text-white shadow-double md:w-fit"
            type="submit"
          >
            Edytuj
          </Button>
        </div>
      </form>
    </ActionModal>
  );
};

export default EditFileName;
