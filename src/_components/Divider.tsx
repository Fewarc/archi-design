import { cn } from "@/utils/styleUtils";

interface DividerProps extends React.AllHTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      <div className="w-full border-b border-black"></div>
      {children && <div className="mx-3">{children}</div>}
      <div className="w-full border-b border-black"></div>
    </div>
  );
};

export default Divider;
