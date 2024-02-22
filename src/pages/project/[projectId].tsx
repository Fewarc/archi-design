import AddAdditionalContact from "@/_components/Modals/AddAdditionalContact";
import Button from "@/_components/Button";
import ContextMenu from "@/_components/ContextMenu";
import AdditionalContactCard from "@/_components/ProjectDetails/AdditionalContactCard";
import ProjectDetailsMenu from "@/_components/ProjectDetailsMenu";
import { api } from "@/utils/api";
import { ProjectDetailsMenuKey } from "@/utils/items";
import { ContextMenuItem, LayoutPage } from "@/utils/types";
import { protectRoute } from "@/utils/validation";
import {
  BookUser,
  Database,
  MoreHorizontal,
  NotebookPen,
  Plus,
} from "lucide-react";
import { GetSessionParams } from "next-auth/react";
import { useMemo, useState } from "react";
import AddProjectNote from "@/_components/Modals/AddProjectNote";
import ProjectNoteCard from "@/_components/ProjectDetails/ProjectNoteCard";
import EditProjectDetials from "@/_components/Modals/EditProjectDetails";

interface ProjectDetailsProps {
  projectId: string;
}

const ProjectDetails: LayoutPage<ProjectDetailsProps> = (props: any) => {
  const [detailsState, setDetailsState] =
    useState<ProjectDetailsMenuKey>("client_profile");
  const [addContactOpen, setAddContactOpen] = useState(false);
  const [addNoteOpen, setAddNoteOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // TODO: create custom hook for data fetch

  const { data: project, isLoading: projectLoading } =
    api.project.find.useQuery({
      projectId: props.params.projectId,
    });

  const { data: additionalContacts, isLoading: contactsLoading } =
    api.additionalContact.find.useQuery({
      projectId: props.params.projectId,
    });

  const { data: notes, isLoading: notesLoading } = api.note.find.useQuery({
    projectId: props.params.projectId,
  });

  const projectContextMenuItems: ContextMenuItem[] = useMemo(
    () => [
      {
        displayName: "Edytuj",
        key: "edit",
        onClick: () => setOpenEdit(true),
      },
      {
        displayName: "Usuń",
        key: "delete",
        onClick: () => setOpenDelete(true),
      },
    ],
    [],
  );

  return (
    <>
      <AddAdditionalContact
        projectId={props.params.projectId}
        open={addContactOpen}
        onClose={() => setAddContactOpen(false)}
      />
      <AddProjectNote
        projectId={props.params.projectId}
        open={addNoteOpen}
        onClose={() => setAddNoteOpen(false)}
      />
      {project && (
        <EditProjectDetials
          project={project}
          open={openEdit}
          onClose={() => setOpenEdit(false)}
        />
      )}
      <section className="flex flex-col pb-20">
        <h1>Projekt</h1>
        <h2 className="text-[24px] font-bold leading-[24px] md:text-[34px] md:leading-[38px]">
          {project?.name}
        </h2>
        <ProjectDetailsMenu
          state={detailsState}
          onStateChange={setDetailsState}
        />
        <section className="mt-9">
          <div className="flex justify-between">
            <div className="flex items-center gap-x-2">
              <Database className="text-archi-purple" />
              <h3 className="text-xl font-bold leading-5">Dane podstawowe</h3>
            </div>
            <ContextMenu menuItems={projectContextMenuItems}>
              <MoreHorizontal />
            </ContextMenu>
          </div>
          <div className="mt-4 text-[12px] leading-[14px]">
            <p className="text-[10px] font-semibold leading-[18px]">
              DANE KONTAKTOWE
            </p>
            <p>{project?.clientName}</p>
            <p>{project?.phoneNumber}</p>
            <p>{project?.email}</p>
          </div>
          <div className="mt-4 text-[12px] leading-[14px]">
            <p className="text-[10px] font-semibold leading-[18px]">ADRES</p>
            <p>{`${project?.city}, ${project?.address}`}</p>
          </div>
        </section>
        <section className="mt-6">
          <div className="flex justify-between">
            <div className="flex items-center gap-x-2">
              <BookUser className="text-archi-purple" />
              <h3 className="text-xl font-bold leading-5">
                Dodatkowe dane kontaktowe
              </h3>
            </div>
            <Button onClick={() => setAddContactOpen(true)} variant="icon">
              <Plus />
            </Button>
          </div>
          <div className="mt-4 flex flex-col gap-y-4">
            {!additionalContacts
              ? "Brak dodatkowych kontaktów"
              : additionalContacts.map((contact) => (
                  <AdditionalContactCard contact={contact} key={contact.id} />
                ))}
          </div>
        </section>
        <section className="mt-6">
          <div className="flex justify-between">
            <div className="flex items-center gap-x-2">
              <NotebookPen className="text-archi-purple" />
              <h3 className="text-xl font-bold leading-5">Notatki</h3>
            </div>
            <Button onClick={() => setAddNoteOpen(true)} variant="icon">
              <Plus />
            </Button>
          </div>
          <div className="mt-4 flex flex-col gap-y-4">
            {notes?.map((note) => (
              <ProjectNoteCard note={note} key={note.id} />
            ))}
          </div>
        </section>
      </section>
    </>
  );
};

export default ProjectDetails;
ProjectDetails.Layout = "navbar";

export async function getServerSideProps(context: GetSessionParams) {
  return protectRoute(context);
}
