import { useBoundingClientRect } from "@/shared/hooks";
import { motion } from "motion/react";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { CardFeature } from "./components/CardFeature/page";
import { CardHidden } from "./components/CardHidden/page";
import { CardInfo } from "./components/CardInfo/page";
import { CardItem } from "./components/CardItem/page";
import stl from "./style.module.scss";
import { Checkbox } from "@/shared/components/ui";
import { SelectedItem } from "@/modules/Goods/page.tsx";

type CardContextValue = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  hiddenRef: React.MutableRefObject<HTMLDivElement | null>;
};

export const CardContext = createContext({} as CardContextValue);

interface CardBaseProps {
  children: ReactNode;
  id: number;
  name: string;
  selectedState: [
    SelectedItem[],
    React.Dispatch<React.SetStateAction<SelectedItem[]>>,
  ];
}

function CardBase({ children, id, selectedState, name }: CardBaseProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hiddenRef = useRef<HTMLDivElement | null>(null);
  const pos = useBoundingClientRect(hiddenRef);

  const isCheckedState = useState(false);

  const [isChecked, setIsChecked] = isCheckedState;
  const [selected, setSelected] = selectedState;

  useEffect(() => {
    if (selected.some((i) => i.id === id)) {
      const newArr = selected.filter((i) => i.id !== id);
      setSelected([...newArr]);
      setIsChecked(false);
    }

    if (isChecked) {
      setSelected((prev) => [...prev, { id, name }]);
    }
  }, [isChecked]);

  return (
    <CardContext.Provider value={{ isOpen, setIsOpen, hiddenRef }}>
      <motion.div
        className={stl.card}
        initial={{ opacity: 0, translateY: -10, height: 52 }}
        animate={{
          height: isOpen ? 70 + pos.size.height : 52,
          opacity: 1,
          translateY: 0,
        }}
        exit={{ opacity: 0, translateY: -10, height: 52 }}
        transition={{ damping: 0 }}
      >
        <Checkbox isCheckedState={isCheckedState} />
        <div className={stl.right}>{children}</div>
      </motion.div>
    </CardContext.Provider>
  );
}

export const Card = Object.assign(CardBase, {
  Info: CardInfo,
  Item: CardItem,
  Hidden: CardHidden,
  Feature: CardFeature,
});
