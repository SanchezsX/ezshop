import { Modal } from "@/shared/components/ui/Modal/page.tsx";
import { Button } from "@/shared/components/ui";
import { ReactNode, useState } from "react";
import stl from "./style.module.scss";
import { cn } from "@/shared/helpers";

interface CreateGoodOptionModalProps {
  children: ReactNode;
  onChoose: (type: "text" | "block" | "priced_block") => void;
}

export function CreateGoodOptionModal({
  children,
  onChoose,
}: CreateGoodOptionModalProps) {
  const [choosed, setChoosed] = useState<
    "text" | "block" | "priced_block" | null
  >(null);
  const openState = useState(false);

  function handleClick() {
    onChoose(choosed!);
    openState[1](false);
    setChoosed(null);
  }

  return (
    <Modal openState={openState}>
      <Modal.Trigger>{children}</Modal.Trigger>
      <Modal.Root title="Выберите вид дополнительной опции">
        <Modal.Body>
          <div className={stl.options}>
            <button
              className={cn(stl.option, choosed === "text" ? stl.active : "")}
              onClick={() => setChoosed("text")}
            >
              <p className={stl.option_placeholder}>Текстовая</p>
              <img src="/icons/modal/text.svg" alt="" />
            </button>
            <button
              className={cn(stl.option, choosed === "block" ? stl.active : "")}
              onClick={() => setChoosed("block")}
            >
              <p className={stl.option_placeholder}>Блочная</p>
              <img src="/icons/modal/block.svg" alt="" />
            </button>
            <button
              className={cn(
                stl.option,
                choosed === "priced_block" ? stl.active : "",
              )}
              onClick={() => setChoosed("priced_block")}
            >
              <p className={stl.option_placeholder}>
                Размеры (с зависимыми ценами)
              </p>
              <img src="/icons/modal/size.svg" alt="" />
            </button>
          </div>
        </Modal.Body>
        <Modal.Action>
          <Button onClick={handleClick} disabled={!choosed}>
            Добавить
          </Button>
        </Modal.Action>
      </Modal.Root>
    </Modal>
  );
}
