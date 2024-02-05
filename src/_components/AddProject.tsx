import { NextPage } from "next";
import { GetSessionParams } from "next-auth/react";
import { newProjectSchema, protectRoute } from "@/utils/validation";
import NavBar from "@/_components/NavBar";
import Input from "@/_components/Input";
import { useState } from "react";
import Button from "@/_components/Button";
import { useMediaQuery, useValidation } from "@/utils/hooks";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { cn } from "@/utils/styleUtils";
import { ArrowLeft, X } from "lucide-react";
import Modal from "./Modal";

interface AddProjectProps {
  open: boolean;
  onClose: Function;
  className?: string;
}

const AddProject: React.FC<AddProjectProps> = ({
  open,
  onClose,
  className,
}) => {
  const [name, setName] = useState("");
  const [clientName, setClientName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const { validate, errors } = useValidation(newProjectSchema);

  const { mutate: createProject } = api.project.create.useMutation({
    onSuccess: () => onClose(),
  });

  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleAddProject = () => {
    const validatedData = validate({
      name,
      clientName,
      address,
      city,
      phoneNumber,
      email,
    });

    !!validatedData && createProject(validatedData);
  };

  return isMobile ? (
    <div
      className={cn(
        "fixed z-50 h-screen w-screen translate-x-full bg-white px-4 pb-6 pt-16 transition-transform duration-300",
        {
          "translate-x-0 transform": open,
        },
        className,
      )}
    >
      <section className="relative mb-10 flex">
        <Button
          variant="icon"
          onClick={() => onClose()}
          className="absolute left-0"
        >
          <ArrowLeft />
        </Button>
        <h2 className="w-full text-center text-[24px] font-bold leading-[24px]">
          Dodaj projekt
        </h2>
      </section>
      <div className="text-[11px]">DANE PODSTAWOWE</div>
      <div className="mt-4 flex flex-col gap-y-4">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="border_label"
          placeholder="imię, miasto"
          label={<div className="text-xs font-semibold">Nazwa</div>}
          error={errors?.name?._errors}
        />
        <Input
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          variant="border_label"
          placeholder="imię i nazwisko"
          label={<div className="text-xs font-semibold">Imię i nazwisko</div>}
          error={errors?.clientName?._errors}
        />
        <Input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          variant="border_label"
          placeholder="ul. Mickiewicza 14"
          label={<div className="text-xs font-semibold">Adres projektu</div>}
          error={errors?.address?._errors}
        />
        <Input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          variant="border_label"
          placeholder="Gliwice"
          label={<div className="text-xs font-semibold">Miasto</div>}
          error={errors?.city?._errors}
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
      <Button
        onClick={() => handleAddProject()}
        variant="defualt"
        className="mt-9 w-full rounded-full border-0 bg-archi-purple px-5 py-2 text-center font-medium text-white shadow-double"
      >
        Dodaj projekt
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
        <h2 className="w-full text-left text-[24px] font-bold leading-[24px]">
          Dodaj projekt
        </h2>
      </section>
      <div className="text-[11px]">DANE PODSTAWOWE</div>
      <div className="mt-4 flex flex-col gap-y-4">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="border_label"
          placeholder="imię, miasto"
          label={<div className="text-xs font-semibold">Nazwa</div>}
          error={errors?.name?._errors}
        />
        <Input
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          variant="border_label"
          placeholder="imię i nazwisko"
          label={<div className="text-xs font-semibold">Imię i nazwisko</div>}
          error={errors?.clientName?._errors}
        />
        <Input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          variant="border_label"
          placeholder="ul. Mickiewicza 14"
          label={<div className="text-xs font-semibold">Adres projektu</div>}
          error={errors?.address?._errors}
        />
        <Input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          variant="border_label"
          placeholder="Gliwice"
          label={<div className="text-xs font-semibold">Miasto</div>}
          error={errors?.city?._errors}
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
      <div className="flex w-full justify-end">
        <Button
          onClick={() => handleAddProject()}
          variant="defualt"
          className="mt-9 w-fit rounded-full border-0 bg-archi-purple px-5 py-2 text-center font-medium text-white shadow-double"
        >
          Dodaj projekt
        </Button>
      </div>
    </Modal>
  );
};

export default AddProject;
