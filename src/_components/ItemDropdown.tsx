import { cn } from "@/utils/styleUtils";
import { useState } from "react";

export type ItemDropdownItem = {
  value: string | number;
  displayName: string;
};

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
}) => {
  const [selected, setSelected] = useState(items[0]);

  const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedItem = items.find((item) => item.value === e.target.value);
    setSelected(selectedItem);
    handleChange(selectedItem!);
  };

  return (
    <select
      value={selected?.value}
      onChange={handleItemChange}
      className={cn(
        "flex h-14 border border-gray-500 pl-4",
        {
          "relative rounded-lg border-black": variant === "border",
          "relative h-fit min-h-[33px] border-0 border-b border-black p-0":
            variant === "default",
        },
        className,
      )}
    >
      {items.map((item, index) => (
        <option value={item.value} key={index}>
          {item.displayName}
        </option>
      ))}
    </select>
  );
};

export default ItemDropdown;
