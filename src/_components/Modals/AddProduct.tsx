import { ModalProps } from "@/utils/types";
import { ProductType, ProjectScope } from "@prisma/client";
import ActionModal from "../ActionModal";
import { z } from "zod";
import { addProductSchema } from "@/utils/validation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../Input";
import Button from "../Button";
import { useDebounce } from "@/utils/hooks";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import ItemDropdown from "../ItemDropdown";
import { ProductTypeItems } from "@/utils/items";

interface AddProductProps extends ModalProps {
  scope: ProjectScope;
}

type AddProductSchemaType = z.infer<typeof addProductSchema>;

const AddProduct: React.FC<AddProductProps> = ({ scope, open, onClose }) => {
  const [link, setLink] = useState<string | null>(null);
  const [productType, setProductType] = useState<ProductType>("PIECE");

  const debouncedScrape = useDebounce((url: string) => {
    if (url !== link) {
      setLink(url);
    }
  }, 500);

  const utils = api.useUtils();

  const { data: scrapedData, isLoading } = api.product.scrape.useQuery(
    {
      url: link,
    },
    {
      refetchOnWindowFocus: false,
      enabled: open,
    },
  );

  const { mutate: createProduct } = api.product.create.useMutation({
    onSuccess: () => {
      utils.product.invalidate();
      onClose();
      setProductType("PIECE");
      setLink(null);
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<AddProductSchemaType>({
    resolver: zodResolver(addProductSchema),
    defaultValues: { projectScopeId: scope.id, type: "PIECE" },
  });

  const onSubmit: SubmitHandler<AddProductSchemaType> = (data) =>
    createProduct(data);

  useEffect(() => {
    if (scrapedData) {
      reset({ projectScopeId: scope.id, ...scrapedData });
    }
  }, [JSON.stringify(scrapedData)]);

  return (
    <ActionModal
      open={open}
      onClose={() => {
        onClose();
      }}
      title="Dodaj"
      subtitle={`Produkt w pomieszczeniu "${scope.name}"`}
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
            onChange={(e) => debouncedScrape(e.target.value)}
            disabled={isLoading}
          />
          <Input
            variant="border_label"
            placeholder=""
            label={<div className="text-xs font-semibold">Nazwa</div>}
            error={errors?.name?.message}
            {...register("name")}
            disabled={isLoading}
          />
          <Input
            variant="border_label"
            placeholder=""
            label={<div className="text-xs font-semibold">Producent</div>}
            error={errors?.producer?.message}
            {...register("producer")}
            disabled={isLoading}
          />
          <Input
            variant="border_label"
            placeholder=""
            label={<div className="text-xs font-semibold">Kolor</div>}
            error={errors?.color?.message}
            {...register("color")}
            disabled={isLoading}
          />
          <Input
            variant="border_label"
            placeholder=""
            label={<div className="text-xs font-semibold">Link do zdjęcia</div>}
            error={errors?.imageUrl?.message}
            {...register("imageUrl")}
            disabled={isLoading}
          />
          <Input
            variant="border_label"
            placeholder=""
            label={<div className="text-xs font-semibold">Cena</div>}
            error={errors?.price?.message}
            {...register("price")}
            disabled={isLoading}
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
                  disabled={isLoading}
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
              disabled={isLoading}
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
            Dodaj
          </Button>
        </div>
      </form>
    </ActionModal>
  );
};

export default AddProduct;
