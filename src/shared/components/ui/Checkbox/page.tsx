import { cn } from "@/shared/helpers";
import stl from "./style.module.scss";

interface CheckboxProps {
  isCheckedState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export function Checkbox({ isCheckedState }: CheckboxProps) {
  const [isChecked, setIsChecked] = isCheckedState;

  return (
    <button
      className={cn(stl.checkbox, isChecked ? stl.active : "")}
      onClick={() => setIsChecked(!isChecked)}
    >
      {isChecked && <img src="/icons/checkbox.svg" alt="" />}
    </button>
  );
}
