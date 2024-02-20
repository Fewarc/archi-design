import { GetSessionParams, getSession } from "next-auth/react";
import { z } from "zod";

export const protectRoute = async (context: GetSessionParams) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const params = (context as { params: Object }).params;

  return {
    props: { params: params ?? {} },
  };
};

// login page
export const loginSchema = z.object({
  email: z.string().email({ message: "Nieprawidłowy adres e-mail." }),
  password: z.string(),
});

// add project
export const projectSchema = z.object({
  name: z.string().min(1, { message: "Pole wymagane." }),
  clientName: z.string().min(1, { message: "Pole wymagane." }),
  address: z.string().min(1, { message: "Pole wymagane." }),
  city: z.string().min(1, { message: "Pole wymagane." }),
  phoneNumber: z.string().min(1, { message: "Pole wymagane." }),
  email: z.string().email({ message: "Nieprawidłowy adres e-mail." }),
});

// add additional contact
export const additionalContactSchema = z.object({
  name: z.string().min(1, { message: "Pole wymagane." }),
  occupation: z.string().min(1, { message: "Pole wymagane." }),
  phoneNumber: z.string().min(1, { message: "Pole wymagane." }),
  email: z.string().email({ message: "Nieprawidłowy adres e-mail." }),
  note: z.string(),
  projectId: z.string(),
});

// edit additional contact
export const editAdditionalContactSchema = z.object({
  name: z.string().min(1, { message: "Pole wymagane." }),
  occupation: z.string().min(1, { message: "Pole wymagane." }),
  phoneNumber: z.string().min(1, { message: "Pole wymagane." }),
  email: z.string().email({ message: "Nieprawidłowy adres e-mail." }),
  note: z.string(),
  projectId: z.string(),
  id: z.string()
});
