import { ProjectStatus } from "@prisma/client";
import { GetSessionParams, getSession } from "next-auth/react";
import { string, z } from "zod";

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

// edit project
export const editProjectSchema = z.object({
  name: z.string().min(1, { message: "Pole wymagane." }),
  clientName: z.string().min(1, { message: "Pole wymagane." }),
  address: z.string().min(1, { message: "Pole wymagane." }),
  city: z.string().min(1, { message: "Pole wymagane." }),
  phoneNumber: z.string().min(1, { message: "Pole wymagane." }),
  email: z.string().email({ message: "Nieprawidłowy adres e-mail." }),
  startDate: z.date(),
  updatedAt: z.date(),
  plannedDeadline: z.date().nullable(),
  status: z.nativeEnum(ProjectStatus),
  id: z.string()
});

// add additional contact
export const addAdditionalContactSchema = z.object({
  name: z.string().min(1, { message: "Pole wymagane." }),
  occupation: z.string().min(1, { message: "Pole wymagane." }),
  phoneNumber: z.string().min(1, { message: "Pole wymagane." }),
  email: z.string().email({ message: "Nieprawidłowy adres e-mail." }),
  note: z.string(),
  projectId: z.string(),
});

// edit additional contact
export const additionalContactSchema = z.object({
  name: z.string().min(1, { message: "Pole wymagane." }),
  occupation: z.string().min(1, { message: "Pole wymagane." }),
  phoneNumber: z.string().min(1, { message: "Pole wymagane." }),
  email: z.string().email({ message: "Nieprawidłowy adres e-mail." }),
  note: z.string(),
  projectId: z.string(),
  id: z.string()
});

// new note
export const addNoteSchema = z.object({
  projectId: z.string(),
  category: z.string().min(1, { message: "Pole wymagane." }),
  content: z.string().min(1, { message: "Pole wymagane." })
});

// edit note
export const noteSchema = z.object({
  projectId: z.string(),
  category: z.string().min(1, { message: "Pole wymagane." }),
  content: z.string().min(1, { message: "Pole wymagane." }),
  id: z.string()
});

// new stage
export const addStageSchema = z.object({
  projectId: z.string(),
  name: z.string().min(1, { message: "Pole wymagane." })
});