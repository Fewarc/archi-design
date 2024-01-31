import Button from "@/_components/Button";
import Dropdown from "@/_components/Dropdown";
import Input from "@/_components/Input";
import NavBar from "@/_components/NavBar";
import { api } from "@/utils/api";
import { DropdownItem } from "@/utils/types";
import { ArrowDownUp, Filter, Plus, Search as SearchIcon } from "lucide-react";
import { NextPage } from "next";
import { useRouter } from "next/router";
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

const Projects: NextPage = () => {
  const [sort, setSort] = useState<
    [SortDropdownItem | null, SortDropdownItem | null]
  >([null, null]);
  const [filter, setFilter] = useState<[FilterDropdownItem | null]>([null]);

  const router = useRouter();

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
    <div className="relative z-0 flex h-full w-full flex-col md:flex md:flex-row">
      <Button
        className="fixed bottom-4 right-4 rounded-2xl bg-archi-purple p-4 md:hidden"
        variant="icon"
        onClick={() => router.push("/add-project")}
      >
        <Plus className="text-white" />
      </Button>
      <NavBar />
      <div className="flex h-full w-full justify-center">
        <section className="w-full max-w-[1142px] px-4 pt-9">
          <div className="flex items-center justify-between">
            <h1>Projekty</h1>
            <Button variant="icon" className="md:hidden">
              <SearchIcon />
            </Button>
            <Button
              variant="defualt"
              className="shadow-double hidden w-fit justify-start rounded-full border-0 bg-archi-purple px-5 py-2 font-medium text-white md:flex"
              onClick={() => router.push("/add-project")}
            >
              <Plus className="-ml-1 -mt-0.5 mr-2" />
              Dodaj projekt
            </Button>
          </div>
          <div className="mt-5 flex w-full gap-x-4">
            <Input
              variant="default"
              placeholder="Wyszukaj..."
              icon={<SearchIcon />}
              className="hidden md:flex"
            />
            <Dropdown
              label="Sortuj"
              itemGroups={PROJECTS_SORT}
              onSelect={handleSortSelect}
              selectedItems={sort as Array<SortDropdownItem>}
              icon={<ArrowDownUp strokeWidth={1.2} />}
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
      </div>
    </div>
  );
};

// export async function getServerSideProps(context: GetSessionParams) {
//   return protectRoute(context);
// }

export default Projects;
