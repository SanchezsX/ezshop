import { cn } from "@/shared/helpers";
import {
  createContext,
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { SelectDropdown } from "./components/SelectDropdown/page";
import { SelectOption } from "./components/SelectOption/page";
import stl from "./style.module.scss";

interface SelectProps {
  children: ReactNode;
  placeholder: string;
  required?: boolean;
  value: string;
  error?: string;
  onChange: (option: string) => void;
}

type SelectContextValue = {
  value: string;
  onChange: (option: string) => void;
  selectRef: RefObject<HTMLDivElement>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setSelected: Dispatch<SetStateAction<string>>;
};

export const SelectContext = createContext({} as SelectContextValue);

export const Select = ({
  children,
  placeholder,
  required,
  value,
  error,
  onChange,
}: SelectProps) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (value) {
      const selectedOption = Array.isArray(children)
        ? children.find(
            (child) =>
              typeof child === "object" &&
              "props" in child &&
              child.props.name === value,
          )
        : null;

      setSelected(selectedOption ? selectedOption.props.children : "");
    }
  }, [value, children]);

  return (
    <SelectContext.Provider
      value={{ value, onChange, selectRef, isOpen, setIsOpen, setSelected }}
    >
      <div className={stl.wrapper}>
        <div
          ref={selectRef}
          className={cn(stl.select, isOpen ? stl.active : "")}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selected && <p className={stl.select_value}>{selected}</p>}
          <p
            className={cn(
              stl.select_placeholder,
              selected ? stl.active : "",
              isOpen ? stl.focus : "",
            )}
          >
            {placeholder}
            {required && <span>*</span>}
          </p>
          <img
            className={isOpen ? stl.active : ""}
            src="/icons/select-arrow.svg"
            alt=""
          />
        </div>
        {error && <p className={stl.error}>{error}</p>}
      </div>

      <SelectDropdown>{children}</SelectDropdown>
    </SelectContext.Provider>
  );
};

Select.Option = SelectOption;
