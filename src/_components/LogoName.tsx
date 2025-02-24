import { cn } from "@/utils/styleUtils";

interface LogoNameProps {
  className?: string;
}

const LogoName: React.FC<LogoNameProps> = ({
  className
}) => {
  return <div className={cn("border", className)}>
    LOGO NAME
  </div>
}

export default LogoName;