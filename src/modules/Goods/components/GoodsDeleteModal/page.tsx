import stl from "./style.module.scss";
import { Modal } from "@/shared/components/ui/Modal/page.tsx";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Button } from "@/shared/components/ui";
import { SelectedItem } from "@/modules/Goods/page.tsx";
import { useMutation } from "@tanstack/react-query";
import ProductService from "@/shared/api/ProductService.ts";
import { useParams } from "react-router";
import { queryClient } from "@/app/Provider.tsx";
import { Product } from "@/shared/models/product.ts";
import { toast } from "sonner";
import { errorCatcher } from "@/shared/helpers/errorCatcher.ts";

interface GoodsDeleteModalProps {
  children: ReactNode;
  selectedState: [SelectedItem[], Dispatch<SetStateAction<SelectedItem[]>>];
}

export function GoodsDeleteModal({
  children,
  selectedState,
}: GoodsDeleteModalProps) {
  const params = useParams();
  const openState = useState(false);
  const [selected, setSelected] = selectedState;

  const { mutate: deleteMutate } = useMutation({
    mutationKey: ["goods/delete"],
    mutationFn: async (productId: number) => {
      toast.loading("Удаление товара...", { id: "good-delete-loading" });

      const res = await ProductService.delete({
        bot_id: Number(params.id),
        product_id: productId,
      });
      return res.data;
    },
    onSuccess: (_, productId) => {
      toast.success("Товар(ы) был(и) успешно удален(ы)!", {
        id: "good-delete-loading",
      });
      queryClient.setQueryData<Product[]>(["goods"], (oldData) =>
        oldData ? oldData.filter((item) => item.id !== productId) : [],
      );

      queryClient.invalidateQueries({ queryKey: ["goods"] });
    },
    onError: (error) => {
      toast.success(errorCatcher(error), {
        id: "good-delete-loading",
      });
    },
  });

  function handleDelete() {
    selected.forEach((s) => deleteMutate(s.id));
    setSelected([]);
    openState[1](false);
  }

  function handleCancel() {
    openState[1](false);
  }

  return (
    <Modal openState={openState}>
      <Modal.Trigger>{children}</Modal.Trigger>
      <Modal.Root title="Вы уверены, что хотите удалить товары?">
        <Modal.Body>
          {selected.map((s) => (
            <div key={s.id} className={stl.item}>
              <p>Название: {s.name}</p>
              <p>ID: {s.id}</p>
            </div>
          ))}
        </Modal.Body>
        <Modal.Action>
          <Button onClick={handleDelete} variant="danger">
            Удалить
          </Button>
          <Button onClick={handleCancel}>Отмена</Button>
        </Modal.Action>
      </Modal.Root>
    </Modal>
  );
}
