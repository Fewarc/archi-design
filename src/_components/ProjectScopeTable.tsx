import { ProjectScope } from "@prisma/client";
import Checkbox from "./Checkbox";
import { ScopeCategories } from "./Modals/AddProjectScope";
import ContextMenu from "./ContextMenu";
import { MoreHorizontal } from "lucide-react";
import { ContextMenuItem } from "@/utils/types";
import { api } from "@/utils/api";

interface ProjectScopeTableProps {
  scopes: ProjectScope[];
  checkedIds: string[];
  onCheckScope: (fileId: string) => void;
  onCheckAll: (fileIds: string[]) => void;
  setScopeToDelete: (scope: ProjectScope) => void;
}

const ProjectScopeTable: React.FC<ProjectScopeTableProps> = ({
  scopes,
  checkedIds,
  onCheckScope,
  onCheckAll,
  setScopeToDelete,
}) => {
  const allScopeIds = scopes.map((scope) => scope.id);

  const getScopeContextMenuItems = (scope: ProjectScope): ContextMenuItem[] => {
    return [
      {
        displayName: "Usuń",
        key: "delete",
        onClick: () => setScopeToDelete(scope),
      },
      {
        displayName: "Edytuj",
        key: "edit",
        onClick: () => null,
      },
    ];
  };

  return (
    <table className="w-full table-fixed">
      <thead className="border-b border-black">
        <tr>
          <th colSpan={1} className="pb-2">
            <Checkbox
              value={allScopeIds.every((id) => checkedIds.includes(id))}
              onChange={() => onCheckAll(allScopeIds)}
            />
          </th>
          <th colSpan={7} className="pb-2 text-left font-normal">
            Nazwa pomieszczenia
          </th>
          <th colSpan={4} className="pb-2 text-left font-normal">
            Powierzchnia
          </th>
          <th colSpan={6} className="pb-2 text-left font-normal">
            Kategoria projektu
          </th>
          <th colSpan={4} className="pb-2 text-left font-normal">
            Koszt za m2
          </th>
          <th colSpan={4} className="pb-2 text-left font-normal">
            Koszt
          </th>
          <th colSpan={1}></th>
        </tr>
      </thead>
      <tbody>
        {scopes.map((scope) => (
          <tr>
            <td colSpan={1} className="pt-2">
              <Checkbox
                value={checkedIds.includes(scope.id)}
                onChange={() => onCheckScope(scope.id)}
              />
            </td>
            <td colSpan={7} className="pt-2">
              <div>{scope.name}</div>
            </td>
            <td colSpan={4} className="pt-2">
              <div>{`${scope.surface} m2`}</div>
            </td>
            <td colSpan={6} className="pt-2">
              <div>
                {
                  ScopeCategories.find(
                    (category) => scope.category === category.key,
                  )?.displayName
                }
              </div>
            </td>
            <td colSpan={4} className="pt-2">
              <div>{`${scope.price} PLN`}</div>
            </td>
            <td colSpan={4} className="pt-2">
              <div>{`${scope.surface * scope.price} PLN`}</div>
            </td>
            <td colSpan={1} className="pt-2">
              <ContextMenu menuItems={getScopeContextMenuItems(scope)}>
                <MoreHorizontal />
              </ContextMenu>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectScopeTable;
