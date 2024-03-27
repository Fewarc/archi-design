import { ContextMenuItem, DriveFile, ProjectViewProps } from "@/utils/types";
import ContextMenu from "./ContextMenu";
import { MoreHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import AddProjectStage from "./Modals/AddProjectStage";
import { api } from "@/utils/api";
import { ProjectStage } from "@prisma/client";
import AddStageFile from "./Modals/AddStageFile";
import ProjectStageSection from "./ProjectStageSection";
import DeleteModal from "./Modals/DeleteModal";

const ProjectSubmitView: React.FC<ProjectViewProps> = ({ project }) => {
  const [addStageOpen, setAddStageOpen] = useState(false);
  const [addFile, setAddFile] = useState<ProjectStage | null>(null);
  const [deleteFile, setDeleteFile] = useState<DriveFile | null>(null);
  const [checkedFiles, setCheckedFiles] = useState<string[]>([]);

  const utils = api.useUtils();

  const { data: stages } = api.projectStage.find.useQuery({
    projectId: project.id,
  });

  const { mutate: deleteFromDrive } = api.file.delete.useMutation({
    onSuccess: () => {
      // TODO: handle file delete success
      utils.projectStage.invalidate();
      setDeleteFile(null);
    },
  });

  const projectStageContextMenuItems: ContextMenuItem[] = useMemo(
    () => [
      {
        displayName: "Dodaj etap",
        key: "add_stage",
        onClick: () => setAddStageOpen(true),
      },
    ],
    [],
  );

  return (
    <>
      <AddProjectStage
        open={addStageOpen}
        onClose={() => setAddStageOpen(false)}
        projectId={project.id}
      />
      <AddStageFile
        open={!!addFile}
        onClose={() => setAddFile(null)}
        stage={addFile}
      />
      <DeleteModal
        open={!!deleteFile}
        onClose={() => setDeleteFile(null)}
        onDelete={() =>
          deleteFile && deleteFromDrive({ fileId: deleteFile?.id })
        }
        subtitle={`Czy na pewno chcesz usunąć plik "${deleteFile?.name}"?`}
      >
        Zostanie on trwale usunięty ze wszystkich kont, które mają do niego
        dostęp
      </DeleteModal>
      <>
        <section className="mt-9">
          <div className="flex justify-between">
            <div className="flex items-center gap-x-2">
              <h3 className="text-xl font-bold leading-5">Etapy projektu</h3>
            </div>
            <ContextMenu menuItems={projectStageContextMenuItems}>
              <MoreHorizontal />
            </ContextMenu>
          </div>
          <div className="mt-6 flex flex-col gap-y-6">
            {stages?.map((stage) => (
              <ProjectStageSection
                key={stage.id}
                stage={stage}
                setAddFile={setAddFile}
                setDeleteFile={setDeleteFile}
                checkedFiles={checkedFiles}
                setCheckedFiles={setCheckedFiles}
              />
            ))}
          </div>
        </section>
      </>
    </>
  );
};

export default ProjectSubmitView;
