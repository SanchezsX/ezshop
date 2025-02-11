import { useQuery } from "@tanstack/react-query";
import CategoryService from "@/shared/api/CategoryService.ts";

export const useGetCategory = (data: { botId: number; categoryId: number }) => {
  const { data: categoryData, isLoading: categoryIsLoading } = useQuery({
    queryKey: [`category/${data.categoryId}`],
    queryFn: async () => {
      const res = await CategoryService.getAll(Number(data.botId));

      return res.data.filter((i) => i.id === Number(data.categoryId))[0];
    },
  });

  return { categoryData, categoryIsLoading };
};
