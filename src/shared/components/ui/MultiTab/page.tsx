import { Category } from "@/shared/models/category.ts";
import { Checkbox } from "@/shared/components/ui";
import stl from "./style.module.scss";

interface MultiTabProps {
  data: Category;
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  removeIdFromOpposite: (id: string) => void;
}

export function MultiTab({
  data,
  selectedIds,
  setSelectedIds,
  removeIdFromOpposite,
}: MultiTabProps) {
  const isChecked = selectedIds.includes(data.name);

  const setIsChecked = (val: boolean) => {
    if (val) {
      removeIdFromOpposite(data.name);
    }
    setSelectedIds((prev) => {
      if (val) {
        return prev.includes(data.name) ? prev : [...prev, data.name];
      } else {
        return prev.filter((id) => id !== data.name);
      }
    });
  };

  return (
    <div className={stl.multitab}>
      <Checkbox isCheckedState={[isChecked, setIsChecked as never]} />
      <p>{data.name}</p>
    </div>
  );
}
