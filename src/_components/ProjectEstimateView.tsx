import { ProjectViewProps } from "@/utils/types";
import { Plus } from "lucide-react";
import Button from "./Button";
import AddProjectScope from "./Modals/AddProjectScope";
import { useState } from "react";
import { api } from "@/utils/api";

const ProjectEstimateView: React.FC<ProjectViewProps> = ({ project }) => {
  const [addProjectScopeOpen, setAddProejectScopeOpen] = useState(false);

  const {
    data: scopes,
    isLoading,
    error,
  } = api.projectScope.find.useQuery({ projectId: project.id });

  return (
    <>
      <AddProjectScope
        open={addProjectScopeOpen}
        onClose={() => setAddProejectScopeOpen(false)}
        projectId={project.id}
      />
      <section className="mt-9">
        <div className="flex items-center justify-between md:justify-start md:gap-x-8">
          <div className="flex items-center gap-x-2">
            <h3 className="text-xl font-bold leading-5 md:text-2xl md:leading-8">
              Zakres projektu
            </h3>
          </div>
          <Button onClick={() => setAddProejectScopeOpen(true)} variant="icon">
            <Plus />
          </Button>
        </div>
        <div className="mt-6 flex flex-col gap-y-6">
          {scopes?.map((scope) => <div>{scope.name}</div>)}
        </div>
      </section>
    </>
  );
};

export default ProjectEstimateView;
