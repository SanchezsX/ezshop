import { useMutation } from "@tanstack/react-query";
import { Category } from "@/shared/models/category.ts";
import CategoryService from "@/shared/api/CategoryService.ts";
import { queryClient } from "@/app/Provider.tsx";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { errorCatcher } from "@/shared/helpers/errorCatcher.ts";

export const useEditCategory = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { mutate: categoryMutate, isPending: categoryIsPending } = useMutation({
    mutationKey: ["categories/edit"],
    mutationFn: async (data: Category) => {
      toast.loading("Редактирование категории...", {
        id: "category-edit-loading",
      });

      const res = await CategoryService.edit({
        ...data,
        id: Number(params.categoryId),
        bot_id: Number(params.id),
      });

      return res.data;
    },
    onSuccess: () => {
      toast.success("Категория была успешно отредактирована!", {
        id: "category-edit-loading",
      });

      queryClient.invalidateQueries({
        queryKey: ["categories", `categories/${params.categoryId}`],
      });

      navigate(-1);
    },
    onError: (error) => {
      toast.error(errorCatcher(error), {
        id: "category-edit-loading",
      });
    },
  });

  return { categoryMutate, categoryIsPending };
};
