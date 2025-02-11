import { useMutation } from "@tanstack/react-query";
import { CategoryCreate } from "@/shared/models/category.ts";
import CategoryService from "@/shared/api/CategoryService.ts";
import { queryClient } from "@/app/Provider.tsx";
import { toast } from "sonner";
import { errorCatcher } from "@/shared/helpers/errorCatcher.ts";
import { useNavigate, useParams } from "react-router";

export const useCreateCategory = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { mutate: categoryMutate, isPending: categoryIsPending } = useMutation({
    mutationKey: ["categories/create"],
    mutationFn: async (data: CategoryCreate) => {
      toast.loading("Создание категория...", {
        id: "category-create-loading",
      });

      const res = await CategoryService.create({
        ...data,
        bot_id: Number(params.id),
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Категория было успешно создана!", {
        id: "category-create-loading",
      });
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      navigate(-1);
    },
    onError: (error) => {
      toast.error(errorCatcher(error), { id: "category-create-loading" });
    },
  });

  return { categoryMutate, categoryIsPending };
};
