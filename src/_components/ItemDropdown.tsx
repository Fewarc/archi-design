import { cn } from "@/utils/styleUtils";
import { ItemDropdownItem } from "@/utils/types";
import { useState } from "react";

interface ItemDropdownProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  items: ItemDropdownItem[];
  variant?: "default" | "border";
  handleChange: (item: ItemDropdownItem) => void;
}

const ItemDropdown: React.FC<ItemDropdownProps> = ({
  items,
  variant = "default",
  handleChange,
  className,
  ...props
}) => {
  const [selected, setSelected] = useState(items[0]);

  const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedItem = items.find((item) => item.key === e.target.value);
    setSelected(selectedItem);
    handleChange(selectedItem!);
  };

  return (
    <select
      {...props}
      value={selected?.key}
      onChange={handleItemChange}
      className={cn(
        "flex h-14 border border-gray-500 px-4",
        {
          "relative rounded-lg border-black": variant === "border",
          "relative h-fit min-h-[33px] border-0 border-b border-black p-0":
            variant === "default",
        },
        className,
      )}
    >
      {items.map((item) => (
        <option value={item.key} key={item.key} className="">
          {item.displayName}
        </option>
      ))}
    </select>
  );
};

export default ItemDropdown;
