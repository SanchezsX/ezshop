import { cn } from "@/shared/helpers";
import stl from "./style.module.scss";

interface ToggleProps {
  value: boolean;
  onChange: (data: boolean) => void;
  disabled?: boolean;
}

export function Toggle({ value, onChange, disabled = false }: ToggleProps) {
  const isActive = value ? stl.active : "";

  return (
    <button
      className={cn(stl.toggle, isActive, disabled ? stl.disabled : "")}
      onClick={() => onChange(!value)}
    >
      <div className={stl.toggle_indicator} />
    </button>
  );
}
