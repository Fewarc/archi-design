import { AdditionalContact } from "@prisma/client";
import ActionModal from "../ActionModal";
import { ModalProps } from "@/utils/types";
import Input from "../Input";
import TextArea from "../TextArea";
import Button from "../Button";
import { additionalContactSchema } from "@/utils/validation";
import { api } from "@/utils/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface EditAdditionalContactsProps extends ModalProps {
  contact: AdditionalContact;
  className?: string;
}

type EditAdditionalContactsSchemaType = z.infer<typeof additionalContactSchema>;

const EditAdditionalContacts: React.FC<EditAdditionalContactsProps> = ({
  contact,
  open,
  onClose,
}) => {
  const utils = api.useUtils();

  const { mutate: editAdditionalContact } =
    api.additionalContact.edit.useMutation({
      onSuccess: (_data) => {
        utils.additionalContact.invalidate();
        onClose();
      },
    });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditAdditionalContactsSchemaType>({
    resolver: zodResolver(additionalContactSchema),
    defaultValues: {
      ...contact,
    },
  });

  const onSubmit: SubmitHandler<EditAdditionalContactsSchemaType> = (data) =>
    editAdditionalContact(data);

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title="Edytuj"
      subtitle="Dodatkowe dane kontaktowe"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-[11px]">DANE PODSTAWOWE</div>
        <div className="mt-4 flex flex-col gap-y-4">
          <Input
            variant="border_label"
            placeholder="imię i nazwisko"
            label={<div className="text-xs font-semibold">Imię i nazwisko</div>}
            error={errors?.name?.message}
            {...register("name")}
          />
          <Input
            variant="border_label"
            placeholder="stolarz, wykonawca"
            label={<div className="text-xs font-semibold">Funkcja</div>}
            error={errors?.occupation?.message}
            {...register("occupation")}
          />
        </div>
        <div className="mt-8 text-[11px]">DANE KONTAKTOWE</div>
        <div className="mt-4 flex flex-col gap-y-4">
          <Input
            variant="border_label"
            placeholder="xxx xxx xxx"
            label={<div className="text-xs font-semibold">Numer telefonu</div>}
            error={errors?.phoneNumber?.message}
            {...register("phoneNumber")}
          />
          <Input
            variant="border_label"
            placeholder="example@example.com"
            label={<div className="text-xs font-semibold">Adres e-mail</div>}
            error={errors?.email?.message}
            {...register("email")}
          />
        </div>
        <div className="mt-8 text-[11px]">INFORAMCJA DODATKOWE</div>
        <div className="mt-4 flex flex-col gap-y-4">
          <Controller
            name="note"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextArea
                variant="border_label"
                label={
                  <div className="text-xs font-semibold !leading-[6px]">
                    Notatki
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

export default EditAdditionalContacts;
