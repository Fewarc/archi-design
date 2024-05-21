import { Plus } from "lucide-react";
import Button from "./Button";
import { Project } from "@prisma/client";
import { api } from "@/utils/api";
import ScopeShopping from "./ScopeShopping";

interface ProjectShoppingViewProps {
  project: Project;
}

const ProjectShoppingView: React.FC<ProjectShoppingViewProps> = ({
  project,
}) => {
  const { data: scopes } = api.projectScope.find.useQuery({
    projectId: project.id,
  });

  return (
    <>
      <section className="mt-9">
        <div className="flex flex-col gap-y-4">
          {scopes?.map((scope) => <ScopeShopping scope={scope} />)}
        </div>
      </section>
    </>
  );
};

export default ProjectShoppingView;
