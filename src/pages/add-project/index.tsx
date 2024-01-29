import { NextPage } from "next";
import { GetSessionParams } from "next-auth/react";
import { protectRoute } from "@/utils/validation";
import NavBar from "@/_components/NavBar";
import Input from "@/_components/Input";
import { useState } from "react";
import Button from "@/_components/Button";

const AddProject: NextPage = () => {
  const [name, setName] = useState("");
  const [clientName, setClientName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [emial, setEmail] = useState("");

  return (
    <div className="relative z-0 flex h-full w-full flex-col md:flex md:flex-row">
      <NavBar />
      <div className="px-4 pt-10">
        <div className="text-[11px]">DANE PODSTAWOWE</div>
        <div className="mt-4 flex flex-col gap-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="border_label"
            placeholder="imię, miasto"
            label={<div className="text-xs font-semibold">Nazwa</div>}
          />
          <Input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            variant="border_label"
            placeholder="imię i nazwisko"
            label={<div className="text-xs font-semibold">Imię i nazwisko</div>}
          />
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            variant="border_label"
            placeholder="ul. Mickiewicza 14"
            label={<div className="text-xs font-semibold">Adres projektu</div>}
          />
          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            variant="border_label"
            placeholder="Gliwice"
            label={<div className="text-xs font-semibold">Miasto</div>}
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
          />
          <Input
            value={emial}
            onChange={(e) => setEmail(e.target.value)}
            variant="border_label"
            placeholder="example@example.com"
            label={<div className="text-xs font-semibold">Adres e-mail</div>}
          />
        </div>
        <Button
          onClick={() => null}
          variant="defualt"
          className="w-full text-center rounded-full border-0 bg-archi-purple px-5 py-2 font-medium text-white shadow-double mt-9"
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
