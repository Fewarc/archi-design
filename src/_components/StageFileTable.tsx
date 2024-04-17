import { ProjectStage } from "@prisma/client";
import Checkbox from "./Checkbox";
import { DriveFile } from "@/utils/types";
import { displayFileSize, formatDate } from "@/utils/stringUtils";
import ContextMenu from "./ContextMenu";
import { MoreHorizontal } from "lucide-react";

interface StageFileTableProps {
  stage: ProjectStage;
  files: DriveFile[];
}

const StageFileTable: React.FC<StageFileTableProps> = ({ stage, files }) => {
  return (
    <table className="w-full table-fixed">
      <thead className="border-b border-black">
        <tr>
          <th colSpan={1} className="pb-2">
            <Checkbox value={false} onChange={() => null} />
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
            <td colSpan={1}>
              <Checkbox value={false} onChange={() => null} />
            </td>
            <td colSpan={16}>{file.name}</td>
            <td colSpan={6}>{formatDate(new Date(file.createdTime))}</td>
            <td colSpan={3}>{displayFileSize(Number(file.size))}</td>
            <td colSpan={1}>
              <ContextMenu menuItems={[]}>
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
