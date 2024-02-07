import ProjectDetailsMenu from "@/_components/ProjectDetailsMenu";
import { api } from "@/utils/api";
import { ProjectDetailsMenuKey } from "@/utils/items";
import { LayoutPage } from "@/utils/types";
import { protectRoute } from "@/utils/validation";
import { GetSessionParams } from "next-auth/react";
import { useState } from "react";

interface ProjectDetailsProps {
  projectId: string;
}

const ProjectDetails: LayoutPage<ProjectDetailsProps> = (props: any) => {
  const [detailsState, setDetailsState] = useState<ProjectDetailsMenuKey>("client_profile");

  const { data: project, isLoading } = api.project.find.useQuery({
    projectId: props.params.projectId,
  });

  return (
    <>
      <section className="flex flex-col">
        <h1>Projekt</h1>
        <h2 className="text-[24px] md:text-[34px] font-bold leading-[24px] md:leading-[38px]">{project?.name}</h2>
        <ProjectDetailsMenu state={detailsState} onStateChange={setDetailsState}/>
      </section>
    </>
  );
};

export default ProjectDetails;
ProjectDetails.Layout = "navbar";

export async function getServerSideProps(context: GetSessionParams) {
  return protectRoute(context);
}
