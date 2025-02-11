import { useMutation } from "@tanstack/react-query";
import { ImageUpload, Product } from "@/shared/models/product.ts";
import ProductService from "@/shared/api/ProductService.ts";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { errorCatcher } from "@/shared/helpers/errorCatcher.ts";

export const useCreateGood = (data: { images: ImageUpload[] }) => {
  const { images } = data;
  const params = useParams();
  const navigate = useNavigate();

  const { mutate: createMutate, isPending: createIsPending } = useMutation({
    mutationKey: ["goods/create"],
    mutationFn: async (data: Product) => {
      toast.loading("Создание товара...", { id: "good-create-loading" });
      const res = await ProductService.create(data);
      return res.data;
    },
    onSuccess: async (productId) => {
      toast.success("Товар был успешно создан!", { id: "good-create-loading" });

      if (images.length) {
        await fileMutateAsync({
          images: images.map((i) => i.file!),
          productId,
        });
      }

      navigate(-1);
    },
    onError: (error) => {
      toast.error(errorCatcher(error), { id: "good-create-loading" });
    },
  });

  const { mutateAsync: fileMutateAsync } = useMutation({
    mutationKey: ["product/upload"],
    mutationFn: async ({
      images,
      productId,
    }: {
      images: File[];
      productId: number;
    }) => {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("files", image);
      });

      return await ProductService.createPhoto(formData, {
        bot_id: Number(params.id),
        product_id: productId,
      });
    },
  });

  return { createMutate, createIsPending };
};
