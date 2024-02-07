import { cn } from "@/utils/styleUtils";
import { Project } from "@prisma/client";
import { Link, MoreHorizontal } from "lucide-react";
import ContextMenu from "./ContextMenu";
import { ContextMenuItem } from "@/utils/types";
import { useMediaQuery } from "@/utils/hooks";
import { createAvatar } from "@dicebear/core";
import { initials } from "@dicebear/collection";
import Image from "next/image";
import { useMemo } from "react";
import Button from "./Button";
import { useRouter } from "next/router";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const projectStatusMap = new Map<Project["status"], string>([
  ["ACTIVE", "AKTYWNY"],
  ["FINISHED", "ZAKOŃCZONY"],
  ["PAUSED", "WSTRZYMANY"],
]);

const PROJECT_CONTEXT_MENU_ITEMS: ContextMenuItem[] = [
  {
    displayName: "Zmień nazwę",
    key: "change_name",
    onClick: () => null,
  },
  {
    displayName: "Zarchiwizuj",
    key: "archive",
    onClick: () => null,
  },
  {
    displayName: "Usuń",
    key: "delete",
    onClick: () => null,
  },
];

const PROJECT_AVATAR_DIM = 218;

const ProjectCard: React.FC<ProjectCardProps> = ({ project, className }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const router = useRouter();

  const avatar = useMemo(
    () =>
      createAvatar(initials, {
        seed: project.clientName,
        backgroundColor: ["EDECF9"],
        textColor: ["6C6AD0"],
        fontWeight: 700,
      }),
    [],
  );

  return (
    <div
      className={cn(
        "flex w-full flex-row rounded-md px-2 py-3 shadow-archi",
        {
          "flex-col": isMobile,
        },
        className,
      )}
    >
      {isMobile ? (
        <>
          <section className="flex justify-between">
            <div className="h-fit rounded-full bg-archi-purple-dark px-3 text-xs font-medium leading-[18px] text-white">
              {projectStatusMap.get(project.status)}
            </div>
            <ContextMenu
              menuItems={PROJECT_CONTEXT_MENU_ITEMS}
              className="mr-2"
            >
              <MoreHorizontal />
            </ContextMenu>
          </section>
          <Button variant="link" onClick={() => router.push(`/project/${project.id}`)}>
            <section className="text-2xl font-bold">{project.name}</section>
          </Button>
          <section className="mt-1 flex justify-between text-[12px] leading-[14px]">
            <div className="w-1/2">
              <p className="text-[10px] font-semibold leading-[18px]">DANE</p>
              <p>{project.clientName}</p>
              <p>{project.phoneNumber}</p>
              <p>{project.email}</p>
            </div>
            <div className="w-1/2">
              <p className="text-[10px] font-semibold leading-[18px]">ADRES</p>
              <p className="text-[12px] leading-[14px]">{project.address}</p>
            </div>
          </section>
          <section className="mt-1 flex justify-between text-[12px] leading-[14px]">
            <div className="w-1/2">
              <p className="text-[10px] font-semibold leading-[18px]">
                DATA ROZPOCZĘCIA
              </p>
              <p>{project.startDate.toLocaleDateString()}</p>
            </div>
            <div className="w-1/2">
              <p className="text-[10px] font-semibold leading-[18px]">
                PLANOWANE ZAKOŃCZENIE
              </p>
              <p>
                {!!project.plannedDeadline
                  ? project.plannedDeadline.toLocaleDateString()
                  : "-"}
              </p>
            </div>
          </section>
        </>
      ) : (
        <section className="flex w-full gap-x-4">
          <div className="relative flex-shrink-0">
            <Image
              alt="project avatar"
              src={avatar.toDataUriSync()}
              width={PROJECT_AVATAR_DIM}
              height={PROJECT_AVATAR_DIM}
              className="rounded-xl"
            ></Image>
            <div className="absolute left-2 top-2 h-fit rounded-full bg-archi-purple-dark px-3 text-xs font-medium leading-[18px] text-white">
              {projectStatusMap.get(project.status)}
            </div>
          </div>
          <div className="flex w-full flex-col">
            <div className="flex w-full justify-between pt-2">
              <div className="flex">
                <Button variant="link" onClick={() => router.push(`/project/${project.id}`)}>
                  <h2 className="text-[34px] font-bold leading-[38px]">
                    {project.name}
                  </h2>
                </Button>
                <Button variant="icon" onClick={() => null}>
                  <Link strokeWidth={2} className="ml-4 h-7 w-7" />
                </Button>
              </div>
              <ContextMenu
                menuItems={PROJECT_CONTEXT_MENU_ITEMS}
                className="mr-2"
              >
                <MoreHorizontal />
              </ContextMenu>
            </div>
            <div className="w-full mt-2 grid grid-cols-12">
              <div className="flex flex-col gap-y-2 col-span-4">
                <div>
                  <p className="text-[10px] font-semibold leading-[18px]">
                    DANE
                  </p>
                  <p>{project.clientName}</p>
                  <p>{project.phoneNumber}</p>
                  <p>{project.email}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold leading-[18px]">
                    ADRES
                  </p>
                  <p>{project.address}</p>
                  <p>{project.city}</p>
                </div>
              </div>
              <div className="flex flex-col w-full col-span-8">
                <div className="flex justify-around">
                  <div>
                    <p className="text-[10px] font-semibold leading-[18px]">
                      DATA ROZPOCZĘCIA
                    </p>
                    <p>{project.startDate.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold leading-[18px]">
                      PLANOWANE ZAKOŃCZENIE
                    </p>
                    <p>
                      {!!project.plannedDeadline
                        ? project.plannedDeadline.toLocaleDateString()
                        : "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProjectCard;
