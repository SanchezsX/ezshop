import { useQuery } from "@tanstack/react-query";
import ProductService from "@/shared/api/ProductService.ts";

export const useGetGoods = (data: { botId: number }) => {
  const { data: goodsData, isLoading: goodsIsLoading } = useQuery({
    queryKey: ["goods"],
    queryFn: async () => {
      const res = await ProductService.getAll({
        bot_id: data.botId,
      });
      return res.data;
    },
  });

  return { goodsData, goodsIsLoading };
};
