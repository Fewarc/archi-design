import { useOnClickOutside } from "@/utils/hooks";
import { cn } from "@/utils/styleUtils";
import { DropdownItem } from "@/utils/types";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useRef, useState } from "react";
import Divider from "./Divider";

interface DropdownProps {
  label?: string;
  items?: DropdownItem[];
  selectedItems?: DropdownItem[];
  onSelect: Function;
  itemsLabel?: string;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  items = [],
  selectedItems = [],
  onSelect,
  itemsLabel,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setOpen(false));

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <div className="flex gap-x-4" onClick={() => setOpen(!open)}>
        <p className="text-sm font-bold">{label}</p>
        {open ? <ChevronUp className="w-5" /> : <ChevronDown className="w-5" />}
      </div>
      {open && (
        <section className="flex flex-col gap-y-1 rounded-lg p-1.5 text-sm font-bold shadow-xl">
          {itemsLabel && itemsLabel}
          {items.map((item) => (
            <>
              <div
                className="flex items-center gap-x-1 rounded-md bg-purple-200 px-1"
                onClick={() => onSelect(item)}
              >
                <Check className="h-6 w-6" />
                <p>{item.displayName}</p>
              </div>
              {item.divide && <Divider className="my-1" />}
            </>
          ))}
        </section>
      )}
    </div>
  );
};

export default Dropdown;
