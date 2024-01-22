import { useMediaQuery } from "@/utils/hooks";
import Button from "./Button";
import {
  Bookmark,
  CircleUserRound,
  Folder,
  Menu as MenuIcon,
  Plus,
} from "lucide-react";
import Logo from "./Logo";
import LogoName from "./LogoName";
import { useRouter } from "next/router";
import { cn } from "@/utils/styleUtils";
import Divider from "./Divider";

type MockProject = {
  name: string;
};

const NavBar: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();

  console.log(router);

  const activeProjects: MockProject[] = Array(3).fill({
    name: "Kasia, Gliwice",
  });

  return isMobile ? (
    <section className="flex w-full items-center justify-between px-4 pt-9">
      <Button variant="icon">
        <MenuIcon className="h-8 w-8" strokeWidth={1.2} />
      </Button>
      <Logo className="h-[51px] w-[51px]" />
      <Button variant="icon">
        <CircleUserRound className="h-10 w-10" strokeWidth={1.2} />
      </Button>
    </section>
  ) : (
    <section className="flex h-full w-60 flex-col items-center shadow-navbar">
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
        {activeProjects.map((project) => (
          <Button
            onClick={() => null}
            variant="borderless"
            className="mt-2 w-full justify-start py-2 pl-2 font-medium"
          >
            <Folder />
            <h5 className="ml-2 mt-0.5">{project.name}</h5>
          </Button>
        ))}
        <div className="w-full flex justify-center">
          <Button
            onClick={() => null}
            variant="defualt"
            className="mt-4 w-fit justify-start py-2 px-5 font-medium text-white bg-archi-purple rounded-full border-0"
          >
            <Plus className="-ml-1 mr-2 -mt-0.5"/>
            Dodaj projekt
          </Button>
        </div>
      </section>
      <div className="w-full flex-grow flex flex-col justify-end">
        <section className="w-full pl-2 pr-2">
        <p className="ml-2 w-full text-xs font-semibold leading-[18px]">
          OBSZAR ROBOCZY
        </p>
        </section>
      </div>
    </section>
  );
};

export default NavBar;
