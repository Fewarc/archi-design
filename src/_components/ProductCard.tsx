import { Product } from "@prisma/client";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="flex border">
      <div className="p-3">
        <div className="relative p-16">
          <Image
            src={product.imageUrl ?? ""}
            alt={product.name}
            objectFit="contain"
            layout="fill"
          />
        </div>
      </div>
      <div className="flex flex-col px-4 py-2">
        <div className="text-2xl font-semibold leading-8">{product.name}</div>
        <div className="flex h-full flex-col justify-center gap-y-2">
          <div className="flex flex-col">
            <div className="text-base font-semibold leading-[18px]">
              {product.color}
            </div>
            <div className="text-sm leading-[18px]">Kolor</div>
          </div>
          <div className="flex flex-col">
            <div className="text-base font-semibold leading-[18px]">
              {!!product.producer?.length ? product.producer : product.shop}
            </div>
            <div className="text-sm leading-[18px]">Producent</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
