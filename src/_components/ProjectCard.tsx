import { cn } from "@/utils/styleUtils";
import { Project } from "@prisma/client";
import { Link, MoreHorizontal } from "lucide-react";
import ContextMenu from "./ContextMenu";
import { useMediaQuery, useProjectAvatar } from "@/utils/hooks";
import Image from "next/image";
import Button from "./Button";
import { useRouter } from "next/router";
import { ContextMenuItem } from "@/utils/types";

interface ProjectCardProps {
  project: Project;
  setArchiveProject: (project: Project) => void;
  setDeleteProject: (project: Project) => void;
  className?: string;
}

const projectStatusMap = new Map<Project["status"], string>([
  ["ACTIVE", "AKTYWNY"],
  ["FINISHED", "ZAKOŃCZONY"],
  ["PAUSED", "WSTRZYMANY"],
]);

const PROJECT_AVATAR_DIM = 218;

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  setArchiveProject,
  setDeleteProject,
  className,
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();
  const avatar = useProjectAvatar(project.clientName);

  const projectCardContextMenuItems: ContextMenuItem[] = [
    {
      displayName: "Zarchiwizuj",
      key: "archive",
      onClick: () => setArchiveProject(project),
    },
    {
      displayName: "Usuń",
      key: "delete",
      onClick: () => setDeleteProject(project),
    },
  ];

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
              menuItems={projectCardContextMenuItems}
              className="mr-2"
            >
              <MoreHorizontal />
            </ContextMenu>
          </section>
          <Button
            variant="link"
            onClick={() => router.push(`/project/${project.id}`)}
          >
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
            />
            <div className="absolute left-2 top-2 h-fit rounded-full bg-archi-purple-dark px-3 text-xs font-medium leading-[18px] text-white">
              {projectStatusMap.get(project.status)}
            </div>
          </div>
          <div className="flex w-full flex-col">
            <div className="flex w-full justify-between pt-2">
              <div className="flex">
                <Button
                  variant="link"
                  onClick={() => router.push(`/project/${project.id}`)}
                >
                  <h2 className="text-[34px] font-bold leading-[38px]">
                    {project.name}
                  </h2>
                </Button>
                <Button variant="icon" onClick={() => null}>
                  <Link strokeWidth={2} className="ml-4 h-7 w-7" />
                </Button>
              </div>
              <ContextMenu
                menuItems={projectCardContextMenuItems}
                className="mr-2"
              >
                <MoreHorizontal />
              </ContextMenu>
            </div>
            <div className="mt-2 grid w-full grid-cols-12">
              <div className="col-span-4 flex flex-col gap-y-2">
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
              <div className="col-span-8 flex w-full flex-col">
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
