import { Product, ProjectScope } from "@prisma/client";
import Button from "./Button";
import { Plus } from "lucide-react";
import AddProduct from "./Modals/AddProduct";
import { useState } from "react";
import { api } from "@/utils/api";
import ProductCard from "./ProductCard";
import DeleteModal from "./Modals/DeleteModal";

interface ScopeShoppingProps {
  scope: ProjectScope;
}

const ScopeShopping: React.FC<ScopeShoppingProps> = ({ scope }) => {
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const utils = api.useUtils();

  const { data: products } = api.product.find.useQuery({ scopeId: scope.id });

  const { mutate: deleteProduct } = api.product.delete.useMutation({
    onSuccess: () => {
      setProductToDelete(null);
      utils.product.invalidate();
    },
  });

  return (
    <>
      <AddProduct
        scope={scope}
        open={addProductOpen}
        onClose={() => setAddProductOpen(false)}
      />
      <DeleteModal
        onClose={() => setProductToDelete(null)}
        open={!!productToDelete}
        onDelete={() => deleteProduct(productToDelete!)}
        subtitle={`Czy na pewno chcesz usunąć projekt "${productToDelete?.name}"?`}
      >
        Produckt "{productToDelete?.name}" zostanie trwale usunięty ze
        wszystkich kont, które mają do niego dostęp
      </DeleteModal>
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
          {products?.map((product) => (
            <ProductCard
              product={product}
              setProductToDelete={setProductToDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-md mt-2 w-full text-center text-archi-gray-light">
          Brak produktów dla tego pomieszczenia
        </div>
      )}
    </>
  );
};

export default ScopeShopping;
