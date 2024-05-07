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
    <section className="fixed bottom-0 left-0 z-50 mt-8 flex h-16 w-screen items-center justify-around bg-white shadow-archi md:relative md:h-auto md:w-auto md:shadow-none">
      {projectDetailsMenuItems.map((item) => {
        const itemActive = item.key === state;

        return (
          <div
            onClick={() => onStateChange(item.key)}
            key={item.key}
            className={cn("box-border w-1/5 cursor-pointer md:pb-2", {
              "md:border-b-2 md:border-archi-purple": itemActive,
            })}
          >
            <div
              className={cn(
                "flex flex-col items-center gap-y-1 text-archi-purple",
              )}
            >
              <div className="md:hidden">{item.icon}</div>
              <h6
                className={cn(
                  "hidden pb-0.5 text-xs font-bold leading-3 md:inline md:text-base md:font-semibold md:leading-5 md:text-black",
                  {
                    "border-b border-archi-purple md:border-none": itemActive,
                    inline: itemActive,
                    "!text-archi-purple": itemActive,
                  },
                )}
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
