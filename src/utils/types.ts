import { LayoutKeys } from "@/_components/Layouts";
import { DefaultErrorShape, TRPCError } from "@trpc/server";
import { NextComponentType, NextPage, NextPageContext } from "next";
import { Session } from "next-auth";
import { AppInitialProps } from "next/app";
import { Router } from "next/router";
import { ProjectDetailsMenuKey } from "./items";
import { ReactNode } from "react";
import { Project } from "@prisma/client";

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
export interface MenuItem<KeyType = string> {
  displayName: string;
  key: KeyType;
}

export interface ProjectDetailsMenuItem
  extends MenuItem<ProjectDetailsMenuKey> {
  icon: ReactNode;
}

export interface DropdownItem<KeyType = string> extends MenuItem<KeyType> {}

export interface ContextMenuItem<KeyType = string> extends MenuItem<KeyType> {
  onClick: Function;
}

export interface ModalProps {
  open: boolean;
  onClose: Function;
}

export interface ProjectViewProps {
  project: Project;
}
