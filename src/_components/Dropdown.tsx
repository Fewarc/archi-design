import { useOnClickOutside } from "@/utils/hooks";
import { cn } from "@/utils/styleUtils";
import { DropdownItem } from "@/utils/types";
import { Check, ChevronDown } from "lucide-react";
import { ReactNode, useRef, useState } from "react";
import Divider from "./Divider";

interface DropdownProps {
  label?: string;
  itemGroups?: DropdownItem[][];
  selectedItems?: DropdownItem[];
  onSelect: Function;
  itemsLabel?: string;
  className?: string;
  icon?: ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  itemGroups = [],
  selectedItems = [],
  onSelect,
  itemsLabel,
  className,
  icon
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setOpen(false));

  return (
    <div className={cn("relative cursor-pointer md:border-b border-black md:pb-2 md:w-full md:max-w-48", className)} ref={dropdownRef}>
      <div className="flex gap-x-4 justify-between" onClick={() => setOpen(!open)}>
        <div className="flex gap-x-4">
          <div className="hidden md:inline">
            {!!icon && icon}
          </div>
          <p className="text-sm md:text-base font-bold md:font-semibold">{label}</p>
        </div>
        <ChevronDown
          className={cn("-mt-0.5 w-5 rotate-0 transition-all duration-300", {
            "rotate-180": open,
          })}
        />
      </div>
      {open && (
        <section className="absolute flex w-full min-w-40 flex-col gap-y-1 rounded-lg p-1.5 text-sm font-bold shadow-archi z-50 bg-white">
          {!!itemsLabel && itemsLabel}
          {itemGroups.map((items, index) => (
            <>
              {!!index && <Divider />}
              {items.map((item) => (
                <>
                  <div
                    className={cn(
                      "flex items-center gap-x-1 rounded-md p-1.5",
                      {
                        "bg-archi-purple-light": selectedItems.includes(item),
                      },
                    )}
                    onClick={() => onSelect(item)}
                  >
                    <Check
                      className={cn("invisible h-6 w-6", {
                        visible: selectedItems.includes(item),
                      })}
                    />
                    <p>{item.displayName}</p>
                  </div>
                </>
              ))}
            </>
          ))}
        </section>
      )}
    </div>
  );
};

export default Dropdown;
