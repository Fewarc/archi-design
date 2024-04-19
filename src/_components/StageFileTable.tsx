import { ProjectStage } from "@prisma/client";
import Checkbox from "./Checkbox";
import { ContextMenuItem, DriveFile } from "@/utils/types";
import { displayFileSize, formatDate } from "@/utils/stringUtils";
import ContextMenu from "./ContextMenu";
import { File, MoreHorizontal } from "lucide-react";
import { downloadFile } from "@/utils/api";

interface StageFileTableProps {
  stage: ProjectStage;
  files: DriveFile[];
  checkedIds: string[];
  onCheckFile: (fileId: string) => void;
  onCheckAll: (fileIds: string[]) => void;
  setDeleteFile: (file: DriveFile) => void;
  setEditFile: (file: DriveFile) => void;
}

const StageFileTable: React.FC<StageFileTableProps> = ({
  stage,
  files,
  checkedIds,
  onCheckFile,
  onCheckAll,
  setDeleteFile,
  setEditFile,
}) => {
  const allFileIds = files.map((file) => file.id);

  const getFileContextMenuItems = (file: DriveFile): ContextMenuItem[] => {
    return [
      {
        displayName: "Pobierz plik",
        key: "download_file",
        onClick: () => downloadFile(file),
      },
      {
        displayName: "Zmień nazwę pliku",
        key: "change_file_name",
        onClick: () => setEditFile(file),
      },
      {
        displayName: "Usuń plik",
        key: "delete_file",
        onClick: () => setDeleteFile(file),
      },
    ];
  };

  return (
    <table className="w-full table-fixed">
      <thead className="border-b border-black">
        <tr>
          <th colSpan={1} className="pb-2">
            <Checkbox
              value={allFileIds.every((id) => checkedIds.includes(id))}
              onChange={() => onCheckAll(allFileIds)}
            />
          </th>
          <th colSpan={16} className="pb-2 text-left font-normal">
            nazwa
          </th>
          <th colSpan={6} className="pb-2 text-left font-normal">
            data modyfikacji
          </th>
          <th colSpan={3} className="pb-2 text-left font-normal">
            rozmiar
          </th>
          <th colSpan={1}></th>
        </tr>
      </thead>
      <tbody>
        {files.map((file) => (
          <tr>
            <td colSpan={1} className="pt-2">
              <Checkbox
                value={checkedIds.includes(file.id)}
                onChange={() => onCheckFile(file.id)}
              />
            </td>
            <td colSpan={16} className="pt-2">
              <a
                className="flex cursor-pointer items-center gap-x-2"
                target="_blank"
                href={file.webViewLink}
              >
                <File />
                <div>{file.name}</div>
              </a>
            </td>
            <td colSpan={6} className="pt-2">
              {formatDate(new Date(file.createdTime), true)}
            </td>
            <td colSpan={3} className="pt-2">
              {displayFileSize(Number(file.size))}
            </td>
            <td colSpan={1} className="pt-2">
              <ContextMenu menuItems={getFileContextMenuItems(file)}>
                <MoreHorizontal />
              </ContextMenu>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StageFileTable;
