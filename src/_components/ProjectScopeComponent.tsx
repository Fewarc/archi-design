import { ContextMenuItem } from "@/utils/types";
import { Check, MoreHorizontal } from "lucide-react";
import ContextMenu from "./ContextMenu";
import { ProjectScope } from "@prisma/client";

interface ProjectScopeProps {
  scope: ProjectScope;
  checkedIds: string[];
  handleCheckChange: (scopeId: string) => void;
  setScopeToDelete: (scope: ProjectScope) => void;
  setScopeToEdit: (scope: ProjectScope) => void;
}

const ProjectScopeComponent: React.FC<ProjectScopeProps> = ({
  scope,
  checkedIds,
  handleCheckChange,
  setScopeToDelete,
  setScopeToEdit,
}) => {
  const getFileContextMenuItems = (scope: ProjectScope): ContextMenuItem[] => {
    return [
      {
        displayName: "Usuń",
        key: "delete",
        onClick: () => setScopeToDelete(scope),
      },
      {
        displayName: "Edutyj",
        key: "edit",
        onClick: () => setScopeToEdit(scope),
      },
    ];
  };

  return (
    <div key={scope.id} className="flex items-center justify-between">
      <div className="flex items-center gap-x-4">
        <div
          className="h-12 w-12 bg-archi-gray-light"
          onClick={() => handleCheckChange(scope.id)}
        >
          {checkedIds.includes(scope.id) && (
            <Check className="h-12 w-12 text-white" />
          )}
        </div>
        <div className="flex flex-col gap-y-[6px]">
          <div className="text-sm leading-[14px]">{scope.name}</div>
        </div>
      </div>
      <ContextMenu menuItems={getFileContextMenuItems(scope)}>
        <MoreHorizontal />
      </ContextMenu>
    </div>
  );
};

export default ProjectScopeComponent;
