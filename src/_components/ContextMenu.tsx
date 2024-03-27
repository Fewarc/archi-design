import { cn } from "@/utils/styleUtils";
import { ReactNode, useRef, useState } from "react";
import Button from "./Button";
import { useOnClickOutside } from "@/utils/hooks";
import { ContextMenuItem } from "@/utils/types";

interface ContextMenuProps {
  menuItems: ContextMenuItem[];
  children: ReactNode;
  className?: string;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  menuItems,
  children,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const contextMenuRef = useRef(null);

  useOnClickOutside(contextMenuRef, () => setOpen(false));

  return (
    <div className={cn("", className)} ref={contextMenuRef}>
      <Button variant="icon" onClick={() => setOpen(!open)}>
        {children}
      </Button>
      {open && (
        <section
          className="absolute right-4 flex min-w-36 flex-col gap-y-2 rounded-lg bg-white p-2 text-sm font-bold shadow-archi duration-300 animate-in fade-in-10"
          onClick={() => setOpen(false)}
        >
          {menuItems.map((item) => (
            <div
              className="w-full cursor-pointer text-right"
              onClick={() => item.onClick()}
              key={item.key}
            >
              {item.displayName}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default ContextMenu;
