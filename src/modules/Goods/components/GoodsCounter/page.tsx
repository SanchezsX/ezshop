import stl from "./style.module.scss";
import { useEffect, useState } from "react";
import { useDebounce } from "@/shared/hooks";
import { Product } from "@/shared/models/product.ts";
import { useMutation } from "@tanstack/react-query";
import ProductService from "@/shared/api/ProductService.ts";
import { queryClient } from "@/app/Provider.tsx";
import { toast } from "sonner";
import { errorCatcher } from "@/shared/helpers/errorCatcher.ts";

export function GoodsCounter({ item }: { item: Product }) {
  const [counter, setCounter] = useState(item.count);
  const debouncedCounter = useDebounce(counter);

  function handleIncrement() {
    setCounter((prev) => prev + 1);
  }

  function handleDecrement() {
    setCounter((prev) => (prev > 0 ? prev - 1 : prev));
  }

  const { mutate } = useMutation({
    mutationKey: ["goods/edit"],
    mutationFn: async (count: number) => {
      toast.loading("Изменяется количество....", {
        id: "counter-edit-loading",
      });
      await ProductService.edit({ ...item, count });
    },
    onSuccess: () => {
      toast.success(`Количество было успешно изменено на ${debouncedCounter}`, {
        id: "counter-edit-loading",
      });
      queryClient.invalidateQueries({ queryKey: ["goods/filter"] });
    },
    onError: (error) => {
      toast.error(errorCatcher(error), {
        id: "counter-edit-loading",
      });
    },
  });

  useEffect(() => {
    if (counter !== item.count) {
      mutate(counter);
    }
  }, [debouncedCounter]);

  return (
    <div className={stl.counter}>
      <h4 className={stl.counter_title}>Количество:</h4>
      <div className={stl.counter_own}>
        <button onClick={handleDecrement}>
          <img src="/icons/counter/minus.svg" alt="" />
        </button>
        <p>{counter}</p>
        <button onClick={handleIncrement}>
          <img src="/icons/counter/plus.svg" alt="" />
        </button>
      </div>
    </div>
  );
}
