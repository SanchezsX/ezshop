import { createContext, Dispatch, ReactNode, SetStateAction } from "react";
import { TabItem } from "./components/TabItem/page";
import stl from "./style.module.scss";
import { cn } from "@/shared/helpers";

type TabContextValue = {
  select: string;
  setSelect: Dispatch<SetStateAction<string>>;
};

export const TabContext = createContext({} as TabContextValue);

interface TabProps {
  children: ReactNode;
  selectState: [string, Dispatch<SetStateAction<string>>];
  disabled?: boolean;
}

function TabBase({ children, selectState, disabled = false }: TabProps) {
  const [select, setSelect] = selectState;

  return (
    <TabContext.Provider value={{ select, setSelect }}>
      <div className={cn(stl.tab, disabled ? stl.disabled : "")}>
        {children}
      </div>
    </TabContext.Provider>
  );
}

export const Tab = Object.assign(TabBase, {
  Item: TabItem,
});
