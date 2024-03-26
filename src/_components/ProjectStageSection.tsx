import { ProjectStage } from "@prisma/client";
import ContextMenu from "./ContextMenu";
import { ContextMenuItem, ProjectWithFiles } from "@/utils/types";
import { MoreHorizontal } from "lucide-react";

interface ProjectStageSectionProps {
  stage: ProjectWithFiles;
  setAddFile: (stage: ProjectStage) => void;
}

const ProjectStageSection: React.FC<ProjectStageSectionProps> = ({
  stage,
  setAddFile,
}) => {
  const getStageContextMenuItems = (stage: ProjectStage): ContextMenuItem[] => {
    return [
      {
        displayName: "Dodaj plik",
        key: "add_file",
        onClick: () => setAddFile(stage),
      },
      {
        displayName: "Zmień nazwę",
        key: "change_name",
        onClick: () => null,
      },
      {
        displayName: "Delete",
        key: "delete",
        onClick: () => null,
      },
    ];
  };

  return (
    <section>
      <div key={stage.id} className="flex justify-between">
        <div className="text-base font-bold leading-[18px]">{stage.name}</div>
        <ContextMenu menuItems={getStageContextMenuItems(stage)}>
          <MoreHorizontal />
        </ContextMenu>
      </div>
      <div>
        {stage.files.map((file) => (
          <div key={file.id}>{file.name}</div>
        ))}
      </div>
    </section>
  );
};

export default ProjectStageSection;
