import AddProject from "@/_components/Modals/AddProject";
import Button from "@/_components/Button";
import MultiDropdown from "@/_components/MultiDropdown";
import Input from "@/_components/Input";
import ProjectCard from "@/_components/ProjectCard";
import { api } from "@/utils/api";
import { MultiDropdownItem, LayoutPage } from "@/utils/types";
import { protectRoute } from "@/utils/validation";
import { ArrowDownUp, Filter, Plus, Search as SearchIcon } from "lucide-react";
import { GetSessionParams } from "next-auth/react";
import { useState } from "react";
import { useUserContext } from "@/_components/Context";
import { Project } from "@prisma/client";
import ArchiveProject from "@/_components/Modals/ArchiveProject";
import DeleteModal from "@/_components/Modals/DeleteModal";

type SortDropdownItem = MultiDropdownItem<"name" | "modified" | "asc" | "desc">;

const PROJECTS_SORT: SortDropdownItem[][] = [
  [
    {
      displayName: "Nazwa",
      key: "name",
    },
    {
      displayName: "Zmodyfikowano",
      key: "modified",
    },
  ],
  [
    {
      displayName: "Rosnąco",
      key: "asc",
    },
    {
      displayName: "Malejąco",
      key: "desc",
    },
  ],
];

type FilterDropdownItem = MultiDropdownItem<"active" | "archived">;

const PROJECTS_FILTERS: FilterDropdownItem[][] = [
  [
    {
      displayName: "Aktywne",
      key: "active",
    },
    {
      displayName: "Archiwalne",
      key: "archived",
    },
  ],
];

const Projects: LayoutPage = () => {
  const [sort, setSort] = useState<
    [SortDropdownItem | null, SortDropdownItem | null]
  >([null, null]);
  const [filter, setFilter] = useState<[FilterDropdownItem | null]>([null]);
  const [addProjectOpen, setAddProjectOpen] = useState<boolean>(false);
  const [archiveProject, setArchiveProject] = useState<Project | null>(null);
  const [deleteProject, setDeleteProject] = useState<Project | null>(null);

  const { user } = useUserContext();

  const utils = api.useUtils();

  const { data: projects, isLoading: _projectsLoading } =
    api.project.getAll.useQuery();

  const { mutate: removeProject } = api.project.delete.useMutation({
    onSuccess: () => {
      utils.project.invalidate();
    },
  });

  const handleSortSelect = (item: SortDropdownItem) => {
    if (item.key === "name" || item.key === "modified") {
      if (sort[0] === item) {
        setSort([null, sort[1]]);
      } else {
        setSort([item, sort[1]]);
      }
    } else {
      if (sort[1] === item) {
        setSort([sort[0], null]);
      } else {
        setSort([sort[0], item]);
      }
    }
  };

  const handleFilterSelect = (item: FilterDropdownItem) => {
    if (filter[0] === item) {
      setFilter([null]);
    } else {
      setFilter([item]);
    }
  };

  return (
    <>
      <AddProject
        open={addProjectOpen}
        teamId={user?.teamId!}
        onClose={() => setAddProjectOpen(false)}
      />
      <ArchiveProject
        open={!!archiveProject}
        project={archiveProject}
        onClose={() => setArchiveProject(null)}
      />
      <DeleteModal
        open={!!deleteProject}
        onClose={() => setDeleteProject(null)}
        onDelete={() =>
          deleteProject && removeProject({ projectId: deleteProject?.id })
        }
        subtitle={`Czy na pewno chcesz usunąć projekt ${deleteProject?.name}`}
      >
        Projekt "{deleteProject?.name}" zostanie trwale usunięty ze wszystkich
        kont, które mają do niego dostęp
      </DeleteModal>
      <Button
        className="fixed bottom-4 right-4 rounded-2xl bg-archi-purple p-4 md:hidden"
        variant="icon"
        onClick={() => setAddProjectOpen(true)}
      >
        <Plus className="text-white" />
      </Button>
      <div className="flex h-full w-full flex-col items-center justify-start">
        <section className="w-full">
          <div className="flex items-center justify-between">
            <h1>Projekty</h1>
            <Button variant="icon" className="md:hidden">
              <SearchIcon />
            </Button>
            <Button
              variant="defualt"
              className="hidden w-fit justify-start rounded-full border-0 bg-archi-purple px-5 py-2 font-medium text-white shadow-double md:flex"
              onClick={() => setAddProjectOpen(true)}
            >
              <Plus className="-ml-1 -mt-0.5 mr-2" />
              Dodaj projekt
            </Button>
          </div>
          <div className="mt-5 flex w-full md:mb-10">
            <Input
              variant="default"
              placeholder="Wyszukaj..."
              icon={<SearchIcon />}
              className="mr-4 hidden md:flex"
            />
            <MultiDropdown
              label="Sortuj"
              itemGroups={PROJECTS_SORT}
              onSelect={handleSortSelect}
              selectedItems={sort as Array<SortDropdownItem>}
              icon={<ArrowDownUp strokeWidth={1.2} />}
              className="mr-4"
            />
            <MultiDropdown
              label="Filtruj"
              itemGroups={PROJECTS_FILTERS}
              onSelect={handleFilterSelect}
              selectedItems={filter as Array<MultiDropdownItem>}
              icon={<Filter strokeWidth={1.2} />}
            />
          </div>
        </section>
        <section className="mt-3 flex w-full flex-col gap-y-3 pb-4 md:gap-y-5">
          {projects?.map((project) => (
            <ProjectCard
              project={project}
              setArchiveProject={setArchiveProject}
              setDeleteProject={setDeleteProject}
              key={project.name + project.clientName}
            />
          ))}
        </section>
      </div>
    </>
  );
};

export async function getServerSideProps(context: GetSessionParams) {
  return protectRoute(context);
}

export default Projects;
Projects.Layout = "navbar";
