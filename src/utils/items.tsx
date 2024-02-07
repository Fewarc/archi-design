import { CalendarCheck, FolderOpenDot, Receipt, ShoppingBasketIcon, User } from "lucide-react";
import { ProjectDetailsMenuItem } from "./types";

export type ProjectDetailsMenuKey =
  | "client_profile"
  | "project_submit"
  | "schedule"
  | "estimate"
  | "shopping_list";

export const projectDetailsMenuItems: ProjectDetailsMenuItem[] = [
  {
    displayName: "Dane",
    key: "client_profile",
    icon: <User />
  },
  {
    displayName: "Oddanie",
    key: "project_submit",
    icon: <FolderOpenDot />
  },
  {
    displayName: "Harmonogram",
    key: "schedule",
    icon: <CalendarCheck />
  },
  {
    displayName: "Kosztorys",
    key: "estimate",
    icon: <Receipt />
  },
  {
    displayName: "Zakupy",
    key: "shopping_list",
    icon: <ShoppingBasketIcon />
  },
];
