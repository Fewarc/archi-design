import { ProjectStage } from "@prisma/client";
import ContextMenu from "./ContextMenu";
import { ContextMenuItem, DriveFile, ProjectWithFiles } from "@/utils/types";
import { Check, MoreHorizontal } from "lucide-react";
import { displayFileSize, formatDate } from "@/utils/stringUtils";

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

  const handleFileChange = (fileId: string) => {
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
        {stage.files.map((file) => (
          <div key={file.id} className="flex items-center gap-x-4">
            <div
              className="h-12 w-12 bg-archi-gray-light"
              onClick={() => handleFileChange(file.id)}
            >
              {checkedFiles.includes(file.id) && (
                <Check className="h-12 w-12 text-white" />
              )}
            </div>
            <div className="flex flex-col gap-y-[6px]">
              <div className="text-sm leading-[14px]">{file.name}</div>
              <div className="flex gap-x-5 text-[11px] leading-[14px]">
                <p>{formatDate(new Date(file.createdTime))}</p>
                <p>{displayFileSize(Number(file.size))}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectStageSection;
