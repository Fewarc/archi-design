import { NextPage } from "next";
import { GetSessionParams } from "next-auth/react";
import { newProjectSchema, protectRoute } from "@/utils/validation";
import NavBar from "@/_components/NavBar";
import Input from "@/_components/Input";
import { useState } from "react";
import Button from "@/_components/Button";
import { useValidation } from "@/utils/hooks";

const AddProject: NextPage = () => {
  const [name, setName] = useState("");
  const [clientName, setClientName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const { validate, errors } = useValidation(newProjectSchema);

  const handleAddProject = () => {
    const validatedData = validate({
      name,
      clientName,
      address,
      city,
      phone,
      email,
    });

    if (!!validatedData) {
      
    }
  };

  return (
    <div className="relative z-0 flex h-full w-full flex-col md:flex md:flex-row">
      <NavBar />
      <div className="px-4 pb-6 pt-28">
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
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            variant="border_label"
            placeholder="xxx xxx xxx"
            label={<div className="text-xs font-semibold">Numer telefonu</div>}
            error={errors?.phone?._errors}
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
    </div>
  );
};

export async function getServerSideProps(context: GetSessionParams) {
  return protectRoute(context);
}

export default AddProject;
