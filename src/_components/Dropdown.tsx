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
  icon,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setOpen(false));

  return (
    <div
      className={cn(
        "relative cursor-pointer border-black md:w-full md:max-w-48 md:border-b md:pb-2",
        className,
      )}
      ref={dropdownRef}
    >
      <div
        className="flex justify-between gap-x-4"
        onClick={() => setOpen(!open)}
      >
        <div className="flex gap-x-4">
          <div className="hidden md:inline">{!!icon && icon}</div>
          <p className="text-sm font-bold md:text-base md:font-semibold">
            {label}
          </p>
        </div>
        <ChevronDown
          className={cn("-mt-0.5 w-5 rotate-0 transition-all duration-300", {
            "rotate-180": open,
          })}
        />
      </div>
      {open && (
        <section className="absolute z-50 flex w-full min-w-40 flex-col gap-y-1 rounded-lg bg-white p-1.5 text-sm font-bold shadow-archi">
          {!!itemsLabel && itemsLabel}
          {itemGroups.map((items, index) => (
            <div>
              {!!index && <Divider className={cn({ "mb-1": !!index })} />}
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
                    key={item.key}
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
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default Dropdown;
