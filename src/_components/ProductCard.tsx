import {
  getPriceNumber,
  getProductPrice,
  getShopName,
} from "@/utils/stringUtils";
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
      <div className="flex w-full min-w-0 flex-col justify-evenly px-4 py-2">
        <div className="min-w-0 truncate text-2xl font-semibold">
          {product.name}
        </div>
        <div className="grid grid-cols-12 content-center">
          <div className="col-span-3 flex h-full flex-col justify-center gap-y-2">
            <div className="flex flex-col">
              <div className="text-base font-semibold leading-[18px]">
                {product.color}
              </div>
              <div className="text-sm leading-[18px]">Kolor</div>
            </div>
            <div className="flex flex-col">
              <div className="text-base font-semibold leading-[18px]">
                {!!product.producer?.length
                  ? product.producer
                  : getShopName(product.shop)}
              </div>
              <div className="text-sm leading-[18px]">Producent</div>
            </div>
          </div>

          <div className="col-span-2 flex h-full flex-col justify-center gap-y-2">
            <div className="flex flex-col">
              <div className="text-base font-semibold leading-[18px]">
                {`${product.metersOrPieces} ${
                  product.type === "METERS" ? "m2" : "szt."
                }`}
              </div>
              <div className="text-sm leading-[18px]">
                {product.type === "METERS" ? "Powierzchnia" : "Ilość"}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-base font-semibold leading-[18px]">
                {getShopName(product.shop)}
              </div>
              <div className="text-sm leading-[18px]">Sklep</div>
            </div>
          </div>

          <div className="col-span-5 flex h-full flex-col items-end justify-center gap-y-2">
            <div className="flex flex-col">
              <div className="text-base font-semibold leading-[18px]">
                {`${getProductPrice(product)} PLN`}
              </div>
              <div className="text-right text-sm leading-[18px]">Cena</div>
            </div>
            <div className="flex flex-col">
              <div className="text-base font-semibold leading-[18px]">
                {product.price}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
