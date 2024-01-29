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

  return {
    props: { session },
  };
}

// login page
export const loginSchema = z.object({
  email: z.string().email({ message: "Nieprawidłowy adres e-mail." }),
  password: z.string(),
});

// add project
export const newProjectSchema = z.object({
  name: z.string().min(1, { message: "Pole wymagane." }),
  clientName: z.string().min(1, { message: "Pole wymagane." }),
  address: z.string().min(1, { message: "Pole wymagane." }),
  city: z.string().min(1, { message: "Pole wymagane." }),
  phone: z.string().min(1, { message: "Pole wymagane." }),
  email: z.string().email({ message: "Nieprawidłowy adres e-mail." }),
});