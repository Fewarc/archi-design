import { displayFileSize, formatDate } from "@/utils/stringUtils";
import { ContextMenuItem, DriveFile } from "@/utils/types";
import { Check, MoreHorizontal } from "lucide-react";
import ContextMenu from "./ContextMenu";
import { downloadFile } from "@/utils/api";

interface StageFileProps {
  file: DriveFile;
  checkedFiles: string[];
  handleCheckChange: (fileId: string) => void;
  setDeleteFile: (file: DriveFile) => void;
  setEditFile: (file: DriveFile) => void;
}

const StageFile: React.FC<StageFileProps> = ({
  file,
  checkedFiles,
  handleCheckChange,
  setDeleteFile,
  setEditFile,
}) => {
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
    <div key={file.id} className="flex items-center justify-between">
      <div className="flex items-center gap-x-4">
        <div
          className="h-12 w-12 bg-archi-gray-light"
          onClick={() => handleCheckChange(file.id)}
        >
          {checkedFiles.includes(file.id) && (
            <Check className="h-12 w-12 text-white" />
          )}
        </div>
        <div className="flex flex-col gap-y-[6px]">
          <a
            target="_blank"
            href={file.webViewLink}
            className="text-sm leading-[14px]"
          >
            {file.name}
          </a>
          <div className="flex gap-x-5 text-[11px] leading-[14px]">
            <p>{formatDate(new Date(file.createdTime))}</p>
            <p>{displayFileSize(Number(file.size))}</p>
          </div>
        </div>
      </div>
      <ContextMenu menuItems={getFileContextMenuItems(file)}>
        <MoreHorizontal />
      </ContextMenu>
    </div>
  );
};

export default StageFile;
