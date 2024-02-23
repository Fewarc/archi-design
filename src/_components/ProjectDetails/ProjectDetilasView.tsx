import { deleteProject } from "@/server/api/routers/project/actions/delete";
import {
  Database,
  MoreHorizontal,
  BookUser,
  Plus,
  NotebookPen,
  Phone,
  AtSign,
  Home,
} from "lucide-react";
import { props } from "node_modules/cypress/types/bluebird";
import Button from "../Button";
import ContextMenu from "../ContextMenu";
import AddAdditionalContact from "../Modals/AddAdditionalContact";
import AddProjectNote from "../Modals/AddProjectNote";
import DeleteModal from "../Modals/DeleteModal";
import EditProjectDetials from "../Modals/EditProjectDetails";
import AdditionalContactCard from "./AdditionalContactCard";
import ProjectNoteCard from "./ProjectNoteCard";
import { useMemo, useState } from "react";
import { Project } from "@prisma/client";
import {
  useMediaQuery,
  useProjectAvatar,
  useProjectDetailsData,
} from "@/utils/hooks";
import { ContextMenuItem } from "@/utils/types";
import Image from "next/image";

interface ProjectDetailsViewProps {
  project: Project;
}

const ProjectDetailsView: React.FC<ProjectDetailsViewProps> = ({ project }) => {
  const [addContactOpen, setAddContactOpen] = useState(false);
  const [addNoteOpen, setAddNoteOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const { additionalContacts, notes, projectDetailsLoading, deleteProject } =
    useProjectDetailsData(project.id);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const avatar = useProjectAvatar(project.clientName);

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
        projectId={project.id}
        open={addContactOpen}
        onClose={() => setAddContactOpen(false)}
      />
      <AddProjectNote
        projectId={project.id}
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
      <DeleteModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onDelete={() => deleteProject()}
        subtitle={`Czy na pewno chcesz usunąć projekt "${project?.name}"?`}
      >
        Zostanie on trwale usunięty ze wszystkich kont, które mają do niego
        dostęp
      </DeleteModal>
      {isMobile ? (
        <>
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
              {!additionalContacts?.length ? (
                <div className="w-full text-center">
                  Brak dodatkowych kontaktów
                </div>
              ) : (
                additionalContacts.map((contact) => (
                  <AdditionalContactCard contact={contact} key={contact.id} />
                ))
              )}
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
              {!notes?.length ? (
                <div className="w-full text-center">Brak notatek</div>
              ) : (
                notes?.map((note) => (
                  <ProjectNoteCard note={note} key={note.id} />
                ))
              )}
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="mt-7">
            <h3 className="text-2xl font-bold leading-8">Dane podstawowe</h3>
            <div className="grid grid-cols-10">
              <div className="col-span-5 flex">
                <Image
                  alt="project avatar"
                  src={avatar.toDataUriSync()}
                  width={175}
                  height={158}
                  className="col-span-2 ml-5 mt-5 justify-self-center rounded-xl"
                />
                <div className="px-10 mt-4">
                  <h4 className="text-xl font-bold leading-6">
                    {project.clientName}
                  </h4>
                  <div className="mt-6">
                    <p className="text-[12px] font-semibold leading-[18px] text-archi-gray">
                      DANE KONTAKTOWE
                    </p>
                    <div className="mt-6 flex gap-x-2">
                      <Phone />
                      <p>{project.phoneNumber}</p>
                    </div>
                    <div className="mt-6 flex gap-x-2">
                      <AtSign />
                      <p>{project.email}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-5">
                <div className="mt-16">
                  <p className="text-[12px] font-semibold leading-[18px] text-archi-gray">
                    ADRES
                  </p>
                  <div className="mt-6 flex gap-x-2">
                    <Home />
                    <p>
                      {project.city}, {project.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="grid grid-cols-10 mt-14">
            <section className="col-span-4">
              <div className="flex gap-x-8">
                <h3 className="text-2xl font-bold leading-8">Notatki</h3>
                <Button variant="icon">
                  <Plus />
                </Button>
              </div>  
            </section>
            <section className="col-span-4 col-start-6">
            <div className="flex gap-x-8">
                <h3 className="text-2xl font-bold leading-8">Dodatkowe dane kontaktowe</h3>
                <Button variant="icon">
                  <Plus />
                </Button>
              </div>  
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default ProjectDetailsView;
