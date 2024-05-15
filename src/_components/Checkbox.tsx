import { cn } from "@/utils/styleUtils";
import { Square, SquareCheckBig } from "lucide-react";

export const checkChange = (
  item: string,
  checkedItems: string[],
  setFunction: (items: string[]) => void,
) => {
  if (checkedItems.includes(item)) {
    setFunction([...checkedItems.filter((id) => id !== item)]);
  } else {
    setFunction([...checkedItems, item]);
  }
};

export const checkAll = (
  items: string[],
  checkedItems: string[],
  setFunction: (items: string[]) => void,
) => {
  if (items.every((id) => checkedItems.includes(id))) {
    setFunction([...checkedItems.filter((fileId) => !items.includes(fileId))]);
  } else {
    setFunction([...checkedItems, ...items]);
  }
};

interface CheckboxProps {
  value: boolean;
  onChange: () => void;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ value, onChange, className }) => {
  return (
    <div className={cn("cursor-pointer", className)} onClick={onChange}>
      {value ? <SquareCheckBig className="text-archi-purple" /> : <Square />}
    </div>
  );
};

export default Checkbox;
