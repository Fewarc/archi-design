import { useMediaQuery } from "@/utils/hooks";
import Button from "./Button";
import {
  Bookmark,
  CircleUserRound,
  Folder,
  LogOut,
  Menu as MenuIcon,
  PieChart,
  Plus,
  Settings,
  ShoppingCart,
} from "lucide-react";
import Logo from "./Logo";
import LogoName from "./LogoName";
import { useRouter } from "next/router";
import { cn } from "@/utils/styleUtils";
import Divider from "./Divider";
import { useSession } from "next-auth/react";
import Image from "next/image";

type MockProject = {
  name: string;
};

const NavBar: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();
  const { data: session } = useSession();

  const mockActiveProjects: MockProject[] = Array(3).fill({
    name: "Kasia, Gliwice",
  });

  return isMobile ? (
    <section className="flex w-full items-center justify-between px-4 pt-7 pb-2 fixed bg-white">
      <Button variant="icon">
        <MenuIcon className="h-8 w-8" strokeWidth={1.2} />
      </Button>
      <Logo className="h-[51px] w-[51px]" />
      <Button variant="icon">
        <CircleUserRound className="h-10 w-10" strokeWidth={1.2} />
      </Button>
    </section>
  ) : (
    <section className="flex h-full min-w-60 flex-col items-center shadow-double">
      <LogoName className="mb-10 mt-10 h-[60px] w-[200px]" />
      <section className="w-full pl-2 pr-2">
        <p className="ml-2 w-full text-xs font-semibold leading-[18px]">
          MENU GŁÓWNE
        </p>
        <Button
          onClick={() => null}
          variant="borderless"
          className={cn("mt-2 w-full justify-start py-2 pl-2 font-medium", {
            "bg-archi-purple-light font-bold": router.pathname === "/projects",
          })}
        >
          <MenuIcon />
          <h5 className="ml-2 mt-0.5">Projekty</h5>
        </Button>
        <Button
          onClick={() => null}
          variant="borderless"
          className={cn("mt-2 w-full justify-start py-2 pl-2 font-medium", {
            "bg-archi-purple-light font-bold": router.pathname === "/tasks",
          })}
        >
          <Bookmark />
          <h5 className="ml-2 mt-0.5">Moje zadania</h5>
        </Button>
      </section>
      <Divider className="mt-2 w-full px-4" />
      <section className="mt-4 w-full pl-2 pr-2">
        <p className="ml-2 w-full text-xs font-semibold leading-[18px]">
          PROJEKTY
        </p>
        {mockActiveProjects.map((project) => (
          <Button
            onClick={() => null}
            variant="borderless"
            className="mt-2 w-full justify-start py-2 pl-2 font-medium"
          >
            <Folder />
            <h5 className="ml-2 mt-0.5">{project.name}</h5>
          </Button>
        ))}
        <div className="flex w-full justify-center">
          <Button
            onClick={() => null}
            variant="defualt"
            className="mt-4 w-fit justify-start rounded-full border-0 bg-archi-purple px-5 py-2 font-medium text-white shadow-double"
          >
            <Plus className="-ml-1 -mt-0.5 mr-2" />
            Dodaj projekt
          </Button>
        </div>
      </section>
      <div className="flex w-full flex-grow flex-col justify-end">
        <section className="w-full pl-2 pr-2">
          <p className="ml-2 w-full text-xs font-semibold leading-[18px]">
            OBSZAR ROBOCZY
          </p>
          <Button
            onClick={() => null}
            variant="defualt"
            className="mt-2 w-full justify-start border-0 py-2 pl-2 font-medium"
          >
            <ShoppingCart />
            <h5 className="ml-2 mt-0.5">Lista zakupów</h5>
          </Button>
          <Button
            onClick={() => null}
            variant="defualt"
            className="mt-2 w-full justify-start border-0 py-2 pl-2 font-medium"
          >
            <PieChart />
            <h5 className="ml-2 mt-0.5">Kosztorys</h5>
          </Button>
          <Button
            onClick={() => null}
            variant="defualt"
            className="mt-2 w-full justify-start border-0 py-2 pl-2 font-medium"
          >
            <Settings />
            <h5 className="ml-2 mt-0.5">Ustawienia</h5>
          </Button>
          <Button
            onClick={() => null}
            variant="defualt"
            className="mt-2 w-full justify-start border-0 py-2 pl-2 font-medium"
          >
            <LogOut />
            <h5 className="ml-2 mt-0.5">Wyloguj się</h5>
          </Button>
        </section>
      </div>
      <Divider className="mt-4 w-full px-4" />
      <section className="mb-4 mt-4 flex w-full items-center gap-x-2 pl-4">
        <Image
          src={session?.user.image!}
          alt="user google image"
          width={40}
          height={40}
          className="max-h-10 max-w-10 flex-grow rounded-full"
        />
        <div>
          <h5 className="font-medium">{session?.user.name}</h5>
          <h5 className="text-sm">{session?.user.email}</h5>
        </div>
      </section>
    </section>
  );
};

export default NavBar;
