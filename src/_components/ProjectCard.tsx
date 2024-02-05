import { cn } from "@/utils/styleUtils";
import { Project } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import ContextMenu from "./ContextMenu";
import { ContextMenuItem } from "@/utils/types";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const ProjectStatusMap = new Map<Project['status'], string>([
  ["ACTIVE", "AKTYWNY"],
  ["FINISHED", "ZAKOŃCZONY"],
  ["PAUSED", "WSTRZYMANY"]
]);

const PROJECT_CONTEXT_MENU_ITEMS: ContextMenuItem[] = [
  {
    displayName: "Zmień nazwę",
    onClick: () => null
  },
  {
    displayName: "Zarchiwizuj",
    onClick: () => null
  },
  {
    displayName: "Usuń",
    onClick: () => null
  },
]

const ProjectCard: React.FC<ProjectCardProps> = ({ project, className }) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col rounded-md px-2 py-3 shadow-archi",
        className,
      )}
    >
      <section className="flex justify-between">
        <div className="h-fit rounded-full bg-archi-purple-dark px-3 text-xs font-medium leading-[18px] text-white">
          {ProjectStatusMap.get(project.status)}
        </div>
        <ContextMenu menuItems={PROJECT_CONTEXT_MENU_ITEMS} className="mr-2">
          <MoreHorizontal />
        </ContextMenu>
      </section>
      <section className="text-2xl font-bold">{project.name}</section>
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
          <p className="text-[10px] font-semibold leading-[18px]">DATA ROZPOCZĘCIA</p>
          <p>{project.startDate.toLocaleDateString()}</p>
        </div>
        <div className="w-1/2">
          <p className="text-[10px] font-semibold leading-[18px]">PLANOWANE ZAKOŃCZENIE</p>
          <p>{!!project.plannedDeadline ? project.plannedDeadline.toLocaleDateString() : "-"}</p>
        </div>
      </section>
    </div>
  );
};

export default ProjectCard;
