import { ProjectScope } from "@prisma/client";
import Button from "./Button";
import { Plus } from "lucide-react";
import AddProduct from "./Modals/AddProduct";
import { useState } from "react";
import { addProductSchema } from "@/utils/validation";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface ScopeShoppingProps {
  scope: ProjectScope;
}

const ScopeShopping: React.FC<ScopeShoppingProps> = ({ scope }) => {
  const [addProductOpen, setAddProductOpen] = useState(false);

  return (
    <>
      <AddProduct
        scope={scope}
        open={addProductOpen}
        onClose={() => setAddProductOpen(false)}
      />
      <div className="flex items-center justify-between md:justify-start md:gap-x-8">
        <div className="flex items-center gap-x-2">
          <h3 className="text-xl font-bold leading-5 md:text-2xl md:leading-8">
            {scope.name}
          </h3>
        </div>
        <Button onClick={() => setAddProductOpen(true)} variant="icon">
          <Plus />
        </Button>
      </div>
    </>
  );
};

export default ScopeShopping;
