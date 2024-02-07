import { ProjectDetailsMenuKey, projectDetailsMenuItems } from "@/utils/items";
import { cn } from "@/utils/styleUtils";

interface ProjectDetailsMenuProps {
  state: ProjectDetailsMenuKey;
  onStateChange: (key: ProjectDetailsMenuKey) => void;
}

const ProjectDetailsMenu: React.FC<ProjectDetailsMenuProps> = ({
  state,
  onStateChange,
}) => {
  return (
    <section className="fixed bottom-0 left-0 md:relative flex h-16 md:h-auto w-screen md:w-auto items-center justify-around bg-white shadow-archi md:shadow-none mt-8">
      {projectDetailsMenuItems.map((item) => {
        const itemActive = item.key === state;

        return (
          <div
            onClick={() => onStateChange(item.key)}
            key={item.key}
            className={cn("w-1/5 cursor-pointer md:pb-2 box-border", {
              "md:border-b-2 md:border-archi-purple": itemActive
            })}
          >
            <div
              className={cn(
                "flex flex-col items-center gap-y-1 text-archi-purple",
              )}
            >
              <div className="md:hidden">
                {item.icon}
              </div>
              <h6
                className={cn("hidden md:inline pb-0.5 text-xs md:text-base font-bold md:font-semibold leading-3 md:leading-5 md:text-black", {
                  "border-b border-archi-purple md:border-none": itemActive,
                  inline: itemActive,
                  "!text-archi-purple": itemActive
                })}
              >
                {item.displayName}
              </h6>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ProjectDetailsMenu;
