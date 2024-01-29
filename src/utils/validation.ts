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
