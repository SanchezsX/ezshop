import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import ShopService from "@/shared/api/ShopService.ts";
import { useInitData } from "@/shared/hooks";

export const useGetShop = () => {
  const params = useParams();
  const initData = useInitData();

  const { data: shopData, isLoading: shopIsLoading } = useQuery({
    queryKey: [`shop/${params.id}`],
    queryFn: async () => {
      const res = await ShopService.get({
        botId: Number(params.id),
        userId: Number(initData?.id),
      });
      return res.data;
    },
    gcTime: 0,
  });

  return { shopData, shopIsLoading };
};
