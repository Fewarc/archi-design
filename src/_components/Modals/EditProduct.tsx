import { ModalProps } from "@/utils/types";
import { Product, ProductType } from "@prisma/client";
import ActionModal from "../ActionModal";
import { z } from "zod";
import { addProductSchema, productSchema } from "@/utils/validation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../Input";
import Button from "../Button";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import ItemDropdown from "../ItemDropdown";
import { ProductTypeItems } from "@/utils/items";

interface EditProductProps extends ModalProps {
  product: Product | null;
}

type EditProductSchemaType = z.infer<typeof productSchema>;

const EditProduct: React.FC<EditProductProps> = ({
  product,
  open,
  onClose,
}) => {
  const [productType, setProductType] = useState<ProductType>("PIECE");

  const utils = api.useUtils();

  const { mutate: editProduct } = api.product.edit.useMutation({
    onSuccess: () => {
      utils.product.invalidate();
      onClose();
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues,
  } = useForm<EditProductSchemaType>({
    resolver: zodResolver(addProductSchema),
    defaultValues: { ...product },
  });

  useEffect(() => {
    !!product && reset(product);
  }, [product]);

  const onSubmit: SubmitHandler<EditProductSchemaType> = (data) =>
    editProduct({ ...data, id: product?.id ?? data.id });

  return (
    <ActionModal
      open={open}
      onClose={() => {
        onClose();
      }}
      title="Edytuj"
      subtitle={`Produkt "${product?.name}"`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-[11px]">DANE PRODUKTU</div>
        <div className="mt-4 flex flex-col gap-y-4">
          <Input
            variant="border_label"
            placeholder=""
            label={
              <div className="text-xs font-semibold">Link do produktu</div>
            }
            error={errors?.link?.message}
            {...register("link")}
            disabled={true}
          />
          <Input
            variant="border_label"
            placeholder=""
            label={<div className="text-xs font-semibold">Nazwa</div>}
            error={errors?.name?.message}
            {...register("name")}
            // disabled={isLoading}
          />
          <Input
            variant="border_label"
            placeholder=""
            label={<div className="text-xs font-semibold">Producent</div>}
            error={errors?.producer?.message}
            {...register("producer")}
            // disabled={isLoading}
          />
          <Input
            variant="border_label"
            placeholder=""
            label={<div className="text-xs font-semibold">Kolor</div>}
            error={errors?.color?.message}
            {...register("color")}
            // disabled={isLoading}
          />
          <Input
            variant="border_label"
            placeholder=""
            label={<div className="text-xs font-semibold">Link do zdjęcia</div>}
            error={errors?.imageUrl?.message}
            {...register("imageUrl")}
            // disabled={isLoading}
          />
          <Input
            variant="border_label"
            placeholder=""
            label={<div className="text-xs font-semibold">Cena</div>}
            error={errors?.price?.message}
            {...register("price")}
            // disabled={isLoading}
          />
          <div className="flex w-full gap-x-4">
            <Controller
              name="type"
              control={control}
              defaultValue="PIECE"
              render={({ field }) => (
                <ItemDropdown
                  items={ProductTypeItems}
                  handleChange={(item) => {
                    field.onChange(item.key);
                    setProductType(item.key as ProductType);
                  }}
                  variant="border"
                  {...field}
                  // disabled={isLoading}
                  className="w-full"
                  defaultValue="PIECE"
                />
              )}
            />
            <Input
              variant="border_label"
              placeholder=""
              label={
                <div className="text-xs font-semibold">
                  {productType === "METERS" ? "Metry" : "Ilość"}
                </div>
              }
              error={errors?.metersOrPieces?.message}
              {...register("metersOrPieces", { valueAsNumber: true })}
              // disabled={isLoading}
              className="w-full"
              type="number"
            />
          </div>
        </div>
        <div className="flex justify-end gap-x-4">
          <Button
            type="submit"
            variant="defualt"
            className="mt-9 w-full rounded-full border-0 bg-archi-purple px-5 py-2 text-center font-medium text-white shadow-double md:w-fit"
          >
            Edytuj
          </Button>
        </div>
      </form>
    </ActionModal>
  );
};

export default EditProduct;
