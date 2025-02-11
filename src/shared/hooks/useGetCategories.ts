import { useQuery } from "@tanstack/react-query";
import CategoryService from "@/shared/api/CategoryService.ts";

export const useGetCategories = (data: { botId: number }) => {
  const { data: categoriesData, isLoading: categoriesIsLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await CategoryService.getAll(Number(data.botId));
      return res.data;
    },
  });

  return { categoriesData, categoriesIsLoading };
};
