import { useMediaQuery } from "@/utils/hooks";
import Button from "./Button";
import { CircleUserRound, Menu } from "lucide-react";
import Logo from "./Logo";
import LogoName from "./LogoName";

const NavBar: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return isMobile ? 
  <section className="flex justify-between items-center w-full pt-9 px-4">
    <Button variant="icon">
      <Menu className="w-8 h-8" strokeWidth={1.2} />
    </Button>
    <Logo className="w-[51px] h-[51px]"/>
    <Button variant="icon">
      <CircleUserRound className="w-10 h-10" strokeWidth={1.2} />
    </Button>
  </section> : 
  <section className="h-full">
    <LogoName />
  </section>;
};

export default NavBar;
