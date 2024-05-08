import Button from "../Button";
import Input from "../Input";
import { addAdditionalContactSchema } from "@/utils/validation";
import TextArea from "../TextArea";
import { api } from "@/utils/api";
import ActionModal from "../ActionModal";
import { z } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface AddAdditionalContactProps {
  projectId: string;
  open: boolean;
  onClose: Function;
}

type AddAdditionalContactSchemaType = z.infer<
  typeof addAdditionalContactSchema
>;

const AddAdditionalContact: React.FC<AddAdditionalContactProps> = ({
  projectId,
  open,
  onClose,
}) => {
  const utils = api.useUtils();

  const { mutate: createAdditionalContact } =
    api.additionalContact.create.useMutation({
      onSuccess: () => {
        utils.additionalContact.invalidate();
        onClose();
        reset();
      },
    });

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<AddAdditionalContactSchemaType>({
    resolver: zodResolver(addAdditionalContactSchema),
    defaultValues: {
      projectId,
    },
  });

  const onSubmit: SubmitHandler<AddAdditionalContactSchemaType> = (data) =>
    createAdditionalContact(data);

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title="Dodaj"
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

export default AddAdditionalContact;
