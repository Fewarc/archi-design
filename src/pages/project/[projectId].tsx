import ProjectDetailsView from "@/_components/ProjectDetilasView";
import ProjectDetailsMenu from "@/_components/ProjectDetailsMenu";
import { api } from "@/utils/api";
import { ProjectDetailsMenuKey } from "@/utils/items";
import { LayoutPage } from "@/utils/types";
import { protectRoute } from "@/utils/validation";
import { Project } from "@prisma/client";
import { GetSessionParams } from "next-auth/react";
import { ReactNode, useState } from "react";
import ProjectSubmitView from "@/_components/ProjectSubmitView";
import GoogleDriveService from "@/services/GoogleDriveService";

interface ProjectDetailsProps {
  params: { projectId: string };
}

const getProjectView = (project: Project, state: ProjectDetailsMenuKey) => {
  return new Map<ProjectDetailsMenuKey, ReactNode>([
    ["details", <ProjectDetailsView project={project} />],
    ["project_submit", <ProjectSubmitView project={project} />],
  ]).get(state);
};

const ProjectDetails: LayoutPage<ProjectDetailsProps> = ({ ...props }) => {
  const [detailsState, setDetailsState] =
    useState<ProjectDetailsMenuKey>("details");

  const { data: project, isLoading: projectLoading } =
    api.project.find.useQuery({
      projectId: props.params.projectId,
    });

  return (
    <>
      <section className="flex flex-col pb-20">
        <div className="sticky top-0 bg-white">
          <h1>Projekt</h1>
          <h2 className="text-[24px] font-bold leading-[24px] md:text-[34px] md:leading-[38px]">
            {project?.name}
          </h2>
          <ProjectDetailsMenu
            state={detailsState}
            onStateChange={setDetailsState}
          />
        </div>
        {project && !projectLoading && getProjectView(project, detailsState)}
      </section>
    </>
  );
};

export default ProjectDetails;
ProjectDetails.Layout = "navbar";

export async function getServerSideProps(context: GetSessionParams) {
  new GoogleDriveService().createFolder()
  return protectRoute(context);
}
