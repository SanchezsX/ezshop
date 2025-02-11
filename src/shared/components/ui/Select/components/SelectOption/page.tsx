import { cn } from "@/shared/helpers";
import { useContext } from "react";
import { SelectContext } from "../../page";
import stl from "./style.module.scss";

interface SelectOptionProps {
  children: string;
  name?: string;
}

export function SelectOption({ children, name }: SelectOptionProps) {
  const { value, onChange, setSelected } = useContext(SelectContext);

  function onSelect() {
    onChange(name!);
    setSelected(children);

    if (name === value) {
      onChange("");
      setSelected("");
      return;
    }
  }

  return (
    <button
      onClick={onSelect}
      className={cn(stl.option, value === name ? stl.active : "")}
    >
      {children}
    </button>
  );
}
