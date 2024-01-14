import { DefaultErrorShape, TRPCError } from "@trpc/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface DynamicObject { [key: string]: any }

export interface ErrorFormatterInput {
  shape: DefaultErrorShape;
  error: TRPCError;
}

export interface DropdownItem {
  displayName: string;
  key: string;
  divide?: boolean;
}