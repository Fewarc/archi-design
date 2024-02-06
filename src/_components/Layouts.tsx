import { cn } from "@/utils/styleUtils";
import { ReactNode } from "react";
import NavBar from "./NavBar";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const DefaultLayout: React.FC<LayoutProps> = ({ children, className }) => {
  return <main className={cn("", className)}>{children}</main>;
};

const NavbarLayout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <main
      className={cn(
        "relative z-0 flex h-full w-full flex-col md:flex md:flex-row",
        className,
      )}
    >
      <NavBar />
      <section className="h-full w-full pt-24 md:pt-8 md:pl-60">{children}</section>
    </main>
  );
};

export const AllLayouts = {
  default: DefaultLayout,
  navbar: NavbarLayout,
};

export type LayoutKeys = keyof typeof AllLayouts;

export default { DefaultLayout, NavbarLayout };
