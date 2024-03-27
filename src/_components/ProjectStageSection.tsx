import { ProjectStage } from "@prisma/client";
import ContextMenu from "./ContextMenu";
import { ContextMenuItem, ProjectWithFiles } from "@/utils/types";
import { MoreHorizontal } from "lucide-react";
import StageFile from "./StageFile";

interface ProjectStageSectionProps {
  stage: ProjectWithFiles;
  setAddFile: (stage: ProjectStage) => void;
  checkedFiles: string[];
  setCheckedFiles: (files: string[]) => void;
}

const ProjectStageSection: React.FC<ProjectStageSectionProps> = ({
  stage,
  setAddFile,
  checkedFiles,
  setCheckedFiles,
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
        displayName: "Usuń",
        key: "delete",
        onClick: () => null,
      },
    ];
  };

  const handleCheckChange = (fileId: string) => {
    if (checkedFiles.includes(fileId)) {
      setCheckedFiles([...checkedFiles.filter((id) => id !== fileId)]);
    } else {
      setCheckedFiles([...checkedFiles, fileId]);
    }
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
        <div className="flex flex-col gap-y-2">
          {!!stage.files.length ? (
            stage.files.map((file) => (
              <StageFile
                file={file}
                checkedFiles={checkedFiles}
                handleCheckChange={handleCheckChange}
              />
            ))
          ) : (
            <div className="mt-2 w-full text-center text-xs text-archi-gray-light">
              Brak plików w tym etapie
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectStageSection;
