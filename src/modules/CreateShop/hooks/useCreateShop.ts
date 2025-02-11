import { useMutation } from "@tanstack/react-query";
import { ShopCreate } from "@/shared/models/shop.ts";
import ShopService from "@/shared/api/ShopService.ts";
import { queryClient } from "@/app/Provider.tsx";
import { toast } from "sonner";
import { errorCatcher } from "@/shared/helpers/errorCatcher.ts";
import { useNavigate } from "react-router";

export const useCreateShop = () => {
  const navigate = useNavigate();

  const { mutate: createMutate, isPaused: createIsPending } = useMutation({
    mutationKey: ["shops/create"],
    mutationFn: async (data: ShopCreate) => {
      toast.loading("Создание магазина...", { id: "shop-create-loading" });
      const res = await ShopService.create(data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: "main/shops" });
      toast.success("Магазин был успешно создан!", {
        id: "shop-create-loading",
      });
      navigate("/");
    },
    onError: (err) => {
      toast.error(errorCatcher(err), { id: "shop-create-loading" });
    },
  });

  return { createMutate, createIsPending };
};
