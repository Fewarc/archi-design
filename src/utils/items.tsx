import {
  CalendarCheck,
  FolderOpenDot,
  Receipt,
  ShoppingBasketIcon,
  User,
} from "lucide-react";
import { ItemDropdownItem, ProjectDetailsMenuItem } from "./types";
import { ProductType, ProjectScopeCategory } from "@prisma/client";

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

export const ScopeCategories: ItemDropdownItem[] = [
  {
    displayName: "Koncepcyjny",
    key: ProjectScopeCategory.CONCEPTUAL,
  },
  {
    displayName: "Kompleksowy",
    key: ProjectScopeCategory.COMPREHENSIVE,
  },
];

export const ProductTypeItems: ItemDropdownItem[] = [
  {
    displayName: "Sztuki",
    key: ProductType.PIECE,
  },
  {
    displayName: "Metry kwadratowe",
    key: ProductType.METERS,
  },
];
