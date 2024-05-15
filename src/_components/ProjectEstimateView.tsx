import { ProjectViewProps } from "@/utils/types";
import { Plus } from "lucide-react";
import Button from "./Button";
import AddProjectScope from "./Modals/AddProjectScope";
import { useState } from "react";
import { api } from "@/utils/api";
import ProjectScopeTable from "./ProjectScopeTable";
import { checkAll, checkChange } from "./Checkbox";
import { ProjectScope } from "@prisma/client";
import DeleteModal from "./Modals/DeleteModal";
import ProjectScopeComponent from "./ProjectScopeComponent";

const ProjectEstimateView: React.FC<ProjectViewProps> = ({ project }) => {
  const [addProjectScopeOpen, setAddProejectScopeOpen] = useState(false);
  const [scopeToDelete, setScopeToDelete] = useState<ProjectScope | null>(null);
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const utils = api.useUtils();

  const { mutate: deleteScope } = api.projectScope.delete.useMutation({
    onSuccess: () => {
      utils.projectScope.invalidate();
    },
  });

  const {
    data: scopes,
    isLoading,
    error,
  } = api.projectScope.find.useQuery({ projectId: project.id });

  const handleCheckChange = (fileId: string) => {
    checkChange(fileId, checkedIds, setCheckedIds);
  };

  const handleCheckAll = (fileIds: string[]) => {
    checkAll(fileIds, checkedIds, setCheckedIds);
  };

  return (
    <>
      <AddProjectScope
        open={addProjectScopeOpen}
        onClose={() => setAddProejectScopeOpen(false)}
        projectId={project.id}
      />
      <DeleteModal
        open={!!scopeToDelete}
        onClose={() => setScopeToDelete(null)}
        onDelete={() =>
          !!scopeToDelete && deleteScope({ scopeId: scopeToDelete.id })
        }
        subtitle="Czy na pewno chcesz usunąć zakres projektu?"
      >
        Zakres "{scopeToDelete?.name}" zostanie trwale usunięty ze wszystkich
        kont, które mają do niego dostęp
      </DeleteModal>
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
        <div className="flex flex-col gap-y-2 md:hidden">
          {scopes?.length ? (
            scopes.map((scope) => (
              <ProjectScopeComponent
                scope={scope}
                checkedIds={checkedIds}
                handleCheckChange={handleCheckChange}
                setScopeToDelete={setScopeToDelete}
                setScopeToEdit={() => null}
              />
            ))
          ) : (
            <div className="mt-2 w-full text-center text-xs text-archi-gray-light">
              Brak plików w tym etapie
            </div>
          )}
        </div>
        <div className="mt-6 flex flex-col gap-y-6">
          <div className="mt-6 hidden md:block">
            {scopes?.length ? (
              <ProjectScopeTable
                scopes={scopes}
                checkedIds={checkedIds}
                onCheckAll={handleCheckAll}
                onCheckScope={handleCheckChange}
                setScopeToDelete={setScopeToDelete}
              />
            ) : (
              <div className="text-md mt-2 w-full text-center text-archi-gray-light">
                Brak zakresów w tym projekcie
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectEstimateView;
