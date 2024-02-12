import { useMediaQuery, useValidation } from "@/utils/hooks";
import { cn } from "@/utils/styleUtils";
import Modal from "./Modal";
import Button from "./Button";
import Input from "./Input";
import { useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import { newAdditionalContactSchema } from "@/utils/validation";
import TextArea from "./TextArea";

interface AddAdditionalContactProps {
  projectId: string;
  open: boolean;
  onClose: Function;
  className?: string;
}

const AddAdditionalContact: React.FC<AddAdditionalContactProps> = ({
  projectId,
  open,
  onClose,
  className,
}) => {
  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");

  const { validate, errors } = useValidation(newAdditionalContactSchema);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleAddContact = () => {
    const validatedData = validate({
      name,
      occupation,
      phoneNumber,
      email,
      note
    });

    !!validatedData && null;
  };

  return isMobile ? (
    <div
      className={cn(
        "fixed left-0 top-0 z-50 h-screen w-screen translate-x-full bg-white px-4 pb-6 pt-16 transition-transform duration-300",
        {
          "translate-x-0 transform": open,
        },
        className,
      )}
    >
      <section className="relative mb-10 flex items-center">
        <Button
          variant="icon"
          onClick={() => onClose()}
          className="absolute left-0"
        >
          <ArrowLeft />
        </Button>
        <div className="w-full text-center">
          <h2 className="w-full text-center text-[24px] font-bold leading-[24px]">
            Dodaj
          </h2>
          <p>Dodatkowe dane kontaktowe</p>
        </div>
      </section>
      <div className="text-[11px]">DANE PODSTAWOWE</div>
      <div className="mt-4 flex flex-col gap-y-4">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="border_label"
          placeholder="imię i nazwisko"
          label={<div className="text-xs font-semibold">Imię i nazwisko</div>}
          error={errors?.name?._errors}
        />
        <Input
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          variant="border_label"
          placeholder="stolarz, wykonawca"
          label={<div className="text-xs font-semibold">Funkcja</div>}
          error={errors?.name?._errors}
        />
      </div>
      <div className="mt-8 text-[11px]">DANE KONTAKTOWE</div>
      <div className="mt-4 flex flex-col gap-y-4">
        <Input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          variant="border_label"
          placeholder="xxx xxx xxx"
          label={<div className="text-xs font-semibold">Numer telefonu</div>}
          error={errors?.phoneNumber?._errors}
        />
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="border_label"
          placeholder="example@example.com"
          label={<div className="text-xs font-semibold">Adres e-mail</div>}
          error={errors?.email?._errors}
        />
      </div>
      <div className="mt-8 text-[11px]">INFORAMCJA DODATKOWE</div>
      <div className="mt-4 flex flex-col gap-y-4">
        <TextArea variant="border_label" label={<div className="text-xs font-semibold !leading-[6px]">Notatki</div>} className="h-fit" areaClassName="h-fit"/>
      </div>
      <Button
        onClick={() => handleAddContact()}
        variant="defualt"
        className="mt-9 w-full rounded-full border-0 bg-archi-purple px-5 py-2 text-center font-medium text-white shadow-double"
      >
        Dodaj
      </Button>
    </div>
  ) : (
    <Modal open={open}>
      <section className="relative mb-10 flex min-w-[644px]">
        <Button
          variant="icon"
          onClick={() => onClose()}
          className="absolute right-0"
        >
          <X />
        </Button>
        <div>
          <h2 className="w-full text-left text-[24px] font-bold leading-[24px] mb-2">
            Dodaj
          </h2>
          <p>Dodatkowe dane kontaktowe</p>
        </div>
      </section>
      <div className="text-[11px]">DANE PODSTAWOWE</div>
      <div className="mt-4 flex flex-col gap-y-4">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="border_label"
          placeholder="imię i nazwisko"
          label={<div className="text-xs font-semibold">Imię i nazwisko</div>}
          error={errors?.name?._errors}
        />
        <Input
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          variant="border_label"
          placeholder="stolarz, wykonawca"
          label={<div className="text-xs font-semibold">Funkcja</div>}
          error={errors?.name?._errors}
        />
      </div>
      <div className="mt-8 text-[11px]">DANE KONTAKTOWE</div>
      <div className="mt-4 flex flex-col gap-y-4">
        <Input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          variant="border_label"
          placeholder="xxx xxx xxx"
          label={<div className="text-xs font-semibold">Numer telefonu</div>}
          error={errors?.phoneNumber?._errors}
        />
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="border_label"
          placeholder="example@example.com"
          label={<div className="text-xs font-semibold">Adres e-mail</div>}
          error={errors?.email?._errors}
        />
      </div>
      <div className="mt-8 text-[11px]">INFORMACJE DODATKOWE</div>
      <div className="mt-4 flex flex-col gap-y-4"></div>
      <div className="flex w-full justify-end">
        <Button
          onClick={() => handleAddContact()}
          variant="defualt"
          className="mt-9 w-fit rounded-full border-0 bg-archi-purple px-5 py-2 text-center font-medium text-white shadow-double"
        >
          Dodaj
        </Button>
      </div>
    </Modal>
  );
};

export default AddAdditionalContact;
