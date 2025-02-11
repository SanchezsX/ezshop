import { cn } from "@/shared/helpers";
import { motion } from "motion/react";
import { ReactNode } from "react";
import { SectionAction } from "./components/SectionAction/page";
import { SectionIcon } from "./components/SectionIcon/page";
import { SectionItem } from "./components/SectionItem/page";
import { SectionLink } from "./components/SectionLink/page";
import { SectionText } from "./components/SectionText/page";
import stl from "./style.module.scss";

interface SectionProps {
  children: ReactNode;
  title: string;
  gap?: boolean;
  index?: boolean;
  loading?: boolean;
}

function SectionBase({
  children,
  title,
  gap = true,
  index = false,
  loading = false,
}: SectionProps) {
  return (
    <motion.section
      className={cn(
        stl.section,
        index ? "" : stl.mt,
        loading ? stl.loading : "",
      )}
      initial={{ transform: "translateY(-10px)", opacity: 0 }}
      animate={{ transform: "translateY(0)", opacity: 1 }}
      exit={{ transform: "translateY(-10px)", opacity: 0 }}
    >
      <h1 className={stl.section_title}>{title}</h1>
      <div className={cn(stl.section_list, gap ? stl.gap : "")}>{children}</div>
    </motion.section>
  );
}

export const Section = Object.assign(SectionBase, {
  Link: SectionLink,
  Icon: SectionIcon,
  Text: SectionText,
  Action: SectionAction,
  Item: SectionItem,
});
