import { ModalProps } from "@/utils/types";
import { ProjectScope } from "@prisma/client";
import ActionModal from "../ActionModal";
import { z } from "zod";
import { addProductSchema } from "@/utils/validation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../Input";
import TextArea from "../TextArea";
import Button from "../Button";
import { useDebounce } from "@/utils/hooks";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";

interface AddProductProps extends ModalProps {
  scope: ProjectScope;
}

type AddProductSchemaType = z.infer<typeof addProductSchema>;

const AddProduct: React.FC<AddProductProps> = ({ scope, open, onClose }) => {
  const [link, setLink] = useState<string | null>(null);

  const debouncedScrape = useDebounce((url: string) => setLink(url), 1000);

  const { data: scrapedData, isLoading } = api.product.scrape.useQuery({
    url: link,
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    reset,
  } = useForm<AddProductSchemaType>({
    resolver: zodResolver(addProductSchema),
    defaultValues: { projectScopeId: scope.id },
  });

  const onSubmit: SubmitHandler<AddProductSchemaType> = (data) => null;

  useEffect(() => {
    if (scrapedData) {
      reset(scrapedData);
    }
  }, [scrapedData]);

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
          />
          <Input
            variant="border_label"
            placeholder=""
            label={<div className="text-xs font-semibold">Nazwa</div>}
            error={errors?.name?.message}
            {...register("name")}
          />
          <Input
            variant="border_label"
            placeholder=""
            label={<div className="text-xs font-semibold">Cena</div>}
            error={errors?.price?.message}
            {...register("price")}
          />
          <Input
            variant="border_label"
            placeholder=""
            label={<div className="text-xs font-semibold">Link do zdjęcia</div>}
            error={errors?.imageUrl?.message}
            {...register("imageUrl")}
          />
          <Input
            variant="border_label"
            placeholder=""
            label={<div className="text-xs font-semibold">Producent</div>}
            error={errors?.producer?.message}
            {...register("producer")}
          />
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextArea
                variant="border_label"
                placeholder="Dodatkowe dane o produkcie"
                label={
                  <div className="text-xs font-semibold !leading-[6px]">
                    Opis
                  </div>
                }
                {...field}
              />
            )}
          />
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
