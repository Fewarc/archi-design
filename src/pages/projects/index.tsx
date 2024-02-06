import AddProject from "@/_components/AddProject";
import Button from "@/_components/Button";
import Dropdown from "@/_components/Dropdown";
import Input from "@/_components/Input";
import ProjectCard from "@/_components/ProjectCard";
import { api } from "@/utils/api";
import { DropdownItem, LayoutPage } from "@/utils/types";
import { protectRoute } from "@/utils/validation";
import { ArrowDownUp, Filter, Plus, Search as SearchIcon } from "lucide-react";
import { GetSessionParams } from "next-auth/react";
import { useState } from "react";

type SortDropdownItem = DropdownItem<"name" | "modified" | "asc" | "desc">;

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

type FilterDropdownItem = DropdownItem<"active" | "archived">;

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

  const { data: projects, isLoading: _projectsLoading } =
    api.project.getAll.useQuery();

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
      <AddProject open={addProjectOpen} onClose={() => setAddProjectOpen(false)}/>
      <Button
        className="fixed bottom-4 right-4 rounded-2xl bg-archi-purple p-4 md:hidden"
        variant="icon"
        onClick={() => setAddProjectOpen(true)}
      >
        <Plus className="text-white" />
      </Button>
      <div className="flex h-full w-full flex-col items-center justify-start">
        <section className="w-full px-4 max-w-page-content">
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
              className="hidden md:flex mr-4"
            />
            <Dropdown
              label="Sortuj"
              itemGroups={PROJECTS_SORT}
              onSelect={handleSortSelect}
              selectedItems={sort as Array<SortDropdownItem>}
              icon={<ArrowDownUp strokeWidth={1.2} />}
              className="mr-4"
            />
            <Dropdown
              label="Filtruj"
              itemGroups={PROJECTS_FILTERS}
              onSelect={handleFilterSelect}
              selectedItems={filter as Array<DropdownItem>}
              icon={<Filter strokeWidth={1.2} />}
            />
          </div>
        </section>
        <section className="flex flex-col gap-y-3 md:gap-y-5 mt-3 w-full px-4 pb-4 max-w-page-content">
          {projects?.map((project) => <ProjectCard project={project} key={project.name + project.clientName}/>)}
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