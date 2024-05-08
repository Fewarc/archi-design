import {
  CalendarCheck,
  FolderOpenDot,
  Receipt,
  ShoppingBasketIcon,
  User,
} from "lucide-react";
import { ContextMenuItem, ProjectDetailsMenuItem } from "./types";

export type ProjectDetailsMenuKey =
  | "details"
  | "project_submit"
  | "schedule"
  | "estimate"
  | "shopping_list";

export const projectDetailsMenuItems: ProjectDetailsMenuItem[] = [
  {
    displayName: "Dane",
    key: "details",
    icon: <User />,
  },
  {
    displayName: "Oddanie",
    key: "project_submit",
    icon: <FolderOpenDot />,
  },
  {
    displayName: "Harmonogram",
    key: "schedule",
    icon: <CalendarCheck />,
  },
  {
    displayName: "Kosztorys",
    key: "estimate",
    icon: <Receipt />,
  },
  {
    displayName: "Zakupy",
    key: "shopping_list",
    icon: <ShoppingBasketIcon />,
  },
];
