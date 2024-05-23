import { ProjectScope } from "@prisma/client";
import Button from "./Button";
import { Plus } from "lucide-react";
import AddProduct from "./Modals/AddProduct";
import { useState } from "react";
import { api } from "@/utils/api";
import ProductCard from "./ProductCard";

interface ScopeShoppingProps {
  scope: ProjectScope;
}

const ScopeShopping: React.FC<ScopeShoppingProps> = ({ scope }) => {
  const [addProductOpen, setAddProductOpen] = useState(false);

  const { data: products } = api.product.find.useQuery({ scopeId: scope.id });

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
      {!!products?.length ? (
        <div className="flex flex-col gap-y-2">
          {products?.map((product) => <ProductCard product={product} />)}
        </div>
      ) : (
        <div className="text-md mt-2 w-full text-center text-archi-gray-light">
          Brak produktów w tym pomieszczeniu
        </div>
      )}
    </>
  );
};

export default ScopeShopping;
