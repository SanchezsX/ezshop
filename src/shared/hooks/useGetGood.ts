import { useQuery } from "@tanstack/react-query";
import ProductService from "@/shared/api/ProductService.ts";

export const useGetGood = (data: { botId: number; goodId: number }) => {
  const { data: goodData, isLoading: goodIsLoading } = useQuery({
    queryKey: [`good/${data.goodId}`],
    queryFn: async () => {
      const res = await ProductService.get({
        bot_id: data.botId,
        product_id: data.goodId,
      });

      return res.data;
    },
  });

  return { goodData, goodIsLoading };
};
