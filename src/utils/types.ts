import { LayoutKeys } from "@/_components/Layouts";
import { DefaultErrorShape, TRPCError } from "@trpc/server";
import { NextComponentType, NextPage, NextPageContext } from "next";
import { Session } from "next-auth";
import { AppInitialProps, AppProps, AppType } from "next/app";
import { Router } from "next/router";

export type LayoutPage<P = {}, IP = P> = NextPage<P, IP> & {
  Layout?: LayoutKeys;
};

export type CustomAppProps = AppInitialProps<{ session: Session | null }> & {
  Component: NextComponentType<NextPageContext, any, any> & {
    Layout: LayoutKeys;
  };
  router: Router;
  __N_SSG?: boolean | undefined;
  __N_SSP?: boolean | undefined;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface DynamicObject {
  [key: string]: any;
}

export interface ErrorFormatterInput {
  shape: DefaultErrorShape;
  error: TRPCError;
}

export interface DropdownItem<T = string> {
  displayName: string;
  key: T;
}

export interface ContextMenuItem {
  displayName: string;
  onClick: Function;
}
