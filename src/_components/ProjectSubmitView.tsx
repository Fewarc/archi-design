import { ContextMenuItem, ProjectViewProps } from "@/utils/types";
import ContextMenu from "./ContextMenu";
import { MoreHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import AddProjectStage from "./Modals/AddProjectStage";
import { api } from "@/utils/api";

const ProjectSubmitView: React.FC<ProjectViewProps> = ({ project }) => {
  const [addStageOpen, setAddStageOpen] = useState(false);

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
          <div>{stages?.map((stage) => <div key={stage.id}>{stage.name}</div>)}</div>
        </section>
      </>
    </>
  );
};

export default ProjectSubmitView;
