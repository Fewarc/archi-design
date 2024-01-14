import Button from "@/_components/Button";
import Dropdown from "@/_components/Dropdown";
import NavBar from "@/_components/NavBar";
import { DropdownItem } from "@/utils/types";
import { Search } from "lucide-react";
import { NextPage } from "next";
import { GetSessionParams, getSession } from "next-auth/react";

const PROJECTS_SORT: DropdownItem[] = [
  {
    displayName: "Option 1",
    key: "1",
    divide: true
  },
  {
    displayName: "Option 2",
    key: "2",
  },
  {
    displayName: "Option 3",
    key: "3",
  },
];

const Projects: NextPage = () => {
  return (
    <div className="relative flex flex-col md:flex md:flex-row">
      <NavBar />
      <section className="px-4 pt-9">
        <div className="flex justify-between items-center">
          <h1>Projekty</h1>
          <Button variant="icon">
            <Search />
          </Button>
        </div>
        <div className="flex mt-5">
          <Dropdown label="Sortuj" items={PROJECTS_SORT} onSelect={() => null} className="w-40"/>
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
