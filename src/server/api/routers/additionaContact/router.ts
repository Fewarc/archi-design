import { addAdditionalContactSchema } from "@/utils/validation";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { createAdditionalContact } from "./actions/create";
import {
  findAdditionalContacts,
  findAdditionalContactsInput,
} from "./actions/find";
import {
  editAdditionalContact,
  editAdditionalContactInput,
} from "./actions/edit";
import {
  deleteAdditionalContact,
  deleteAdditionalContactInput,
} from "./actions/delete";

export const additionalContactRouter = createTRPCRouter({
  create: protectedProcedure
    .input(addAdditionalContactSchema)
    .mutation(({ input, ctx }) => {
      return createAdditionalContact(input, ctx.db);
    }),
  find: protectedProcedure
    .input(findAdditionalContactsInput)
    .query(({ input, ctx }) => {
      return findAdditionalContacts(input, ctx.db);
    }),
  edit: protectedProcedure
    .input(editAdditionalContactInput)
    .mutation(({ input, ctx }) => {
      return editAdditionalContact(input, ctx.db);
    }),
  delete: protectedProcedure
    .input(deleteAdditionalContactInput)
    .mutation(({ input, ctx }) => {
      return deleteAdditionalContact(input, ctx.db);
    }),
});
