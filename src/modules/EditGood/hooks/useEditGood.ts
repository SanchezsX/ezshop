import { useMutation } from "@tanstack/react-query";
import { ImageUpload, Product } from "@/shared/models/product.ts";
import ProductService from "@/shared/api/ProductService.ts";
import { queryClient } from "@/app/Provider.tsx";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { errorCatcher } from "@/shared/helpers/errorCatcher.ts";

export const useEditGood = (data: { images: ImageUpload[] }) => {
  const params = useParams();
  const navigate = useNavigate();

  const { mutate: goodMutate, isPending: goodIsPending } = useMutation({
    mutationKey: ["good/edit"],
    mutationFn: async (data: Product) => {
      toast.loading("Редактирование категории...", {
        id: "good-edit-loading",
      });

      const res = await ProductService.edit({
        bot_id: Number(params.id),
        ...data,
      });

      return res.data;
    },
    onSuccess: async () => {
      toast.success("Категория была успешно отредактирована!", {
        id: "good-edit-loading",
      });

      queryClient.invalidateQueries({
        queryKey: ["goods", "good"],
      });

      if (data.images.some((i) => !i.file)) {
        const imgsArr = data.images.map((i) => [i.order.toString(), i.image]);
        mutateAsync(imgsArr);
      }

      if (data.images.some((i) => i.file)) {
        const fileArr = data.images.filter((d) => d.file).map((i) => i.file);
        fileMutateAsync({ images: fileArr as File[] });
      }

      navigate(-1);
    },
    onError: (error) => {
      toast.error(errorCatcher(error), {
        id: "good-edit-loading",
      });
    },
  });

  const { mutateAsync: fileMutateAsync } = useMutation({
    mutationKey: ["product/upload"],
    mutationFn: async ({ images }: { images: File[] }) => {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("files", image);
      });

      return await ProductService.createPhoto(formData, {
        bot_id: Number(params.id),
        product_id: Number(params.goodId),
      });
    },
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["picture/edit"],
    mutationFn: async (data: string[][]) => {
      await ProductService.editPhoto({
        botId: Number(params.id),
        productId: Number(params.goodId),
        body: data,
      });
    },
  });

  return { goodMutate, goodIsPending };
};
