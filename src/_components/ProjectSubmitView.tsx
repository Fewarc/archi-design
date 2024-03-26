import { ContextMenuItem, ProjectViewProps } from "@/utils/types";
import ContextMenu from "./ContextMenu";
import { MoreHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import AddProjectStage from "./Modals/AddProjectStage";
import { api } from "@/utils/api";
import { ProjectStage } from "@prisma/client";
import AddStageFile from "./Modals/AddStageFile";
import ProjectStageSection from "./ProjectStageSection";

const ProjectSubmitView: React.FC<ProjectViewProps> = ({ project }) => {
  const [addStageOpen, setAddStageOpen] = useState(false);
  const [addFile, setAddFile] = useState<ProjectStage | null>(null);

  const { data: stages } = api.projectStage.find.useQuery({
    projectId: project.id,
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
                stage={stage}
                setAddFile={setAddFile}
                key={stage.id}
              />
            ))}
          </div>
        </section>
      </>
    </>
  );
};

export default ProjectSubmitView;
