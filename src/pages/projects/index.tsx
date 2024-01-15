import Button from "@/_components/Button";
import Dropdown from "@/_components/Dropdown";
import NavBar from "@/_components/NavBar";
import { DropdownItem } from "@/utils/types";
import { Search } from "lucide-react";
import { NextPage } from "next";
import { GetSessionParams, getSession } from "next-auth/react";
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
    <div className="relative flex flex-col md:flex md:flex-row">
      <NavBar />
      <section className="px-4 pt-9">
        <div className="flex items-center justify-between">
          <h1>Projekty</h1>
          <Button variant="icon">
            <Search />
          </Button>
        </div>
        <div className="mt-5 flex gap-x-4">
          <Dropdown
            label="Sortuj"
            itemGroups={PROJECTS_SORT}
            onSelect={handleSortSelect}
            selectedItems={sort as Array<SortDropdownItem>}
          />
          <Dropdown
            label="Filtruj"
            itemGroups={PROJECTS_FILTERS}
            onSelect={handleFilterSelect}
            selectedItems={filter as Array<DropdownItem>}
          />
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context: GetSessionParams) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default Projects;
