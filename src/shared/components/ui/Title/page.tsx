import { ReactNode } from "react";
import { TitleButton } from "./components/TitleButton/page";
import { TitleFilter } from "./components/TitleFilter/page";
import { TitleItems } from "./components/TitleItems/page";
import { TitleText } from "./components/TitleText/page";
import stl from "./style.module.scss";

function TitleBase({ children }: { children: ReactNode }) {
  return <div className={stl.wrapper}>{children}</div>;
}

export const Title = Object.assign(TitleBase, {
  Text: TitleText,
  Items: TitleItems,
  Button: TitleButton,
  Filter: TitleFilter,
});
