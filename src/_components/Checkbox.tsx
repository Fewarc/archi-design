import { cn } from "@/utils/styleUtils";
import { Square, SquareCheckBig } from "lucide-react";

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
