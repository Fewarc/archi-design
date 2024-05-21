import { ProjectScope } from "@prisma/client";
import Button from "./Button";
import { Plus } from "lucide-react";

interface ScopeShoppingProps {
  scope: ProjectScope;
}

const ScopeShopping: React.FC<ScopeShoppingProps> = ({ scope }) => {
  return (
    <div className="flex items-center justify-between md:justify-start md:gap-x-8">
      <div className="flex items-center gap-x-2">
        <h3 className="text-xl font-bold leading-5 md:text-2xl md:leading-8">
          {scope.name}
        </h3>
      </div>
      <Button onClick={() => null} variant="icon">
        <Plus />
      </Button>
    </div>
  );
};

export default ScopeShopping;
