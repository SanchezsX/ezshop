import { cn } from "@/shared/helpers";
import { ReactNode, useContext } from "react";
import { CardContext } from "../../page";
import stl from "./style.module.scss";

export function CardInfo({ children }: { children: ReactNode }) {
  const { isOpen, setIsOpen } = useContext(CardContext);

  return (
    <div className={stl.info} onClick={() => setIsOpen(!isOpen)}>
      {children}
      <button className={cn(stl.arrow, isOpen ? stl.active : "")}>
        <img src="/icons/select-arrow.svg" alt="" />
      </button>
    </div>
  );
}
