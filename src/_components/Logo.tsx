import { cn } from "@/utils/styleUtils";
import { X } from "lucide-react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn(className)}>
      <div className="w-28 h-28 bg-gray-300 rounded-full flex justify-center items-center">
        <X className="w-44 h-44" strokeWidth={0.1}/>
      </div>
    </div>
  );
};

export default Logo;
