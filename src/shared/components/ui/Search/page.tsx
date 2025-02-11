import { motion } from "motion/react";
import { Dispatch, SetStateAction } from "react";
import stl from "./style.module.scss";

interface TitleSearchInputProps {
  queryState: [string, Dispatch<SetStateAction<string>>];
  placeholder?: string;
}

export function Search({
  queryState,
  placeholder = "Поиск",
}: TitleSearchInputProps) {
  const [query, setQuery] = queryState;

  return (
    <motion.label
      htmlFor="search"
      className={stl.label}
      initial={{ transform: "translateY(-10px)", opacity: 0 }}
      animate={{ transform: "translateY(0)", opacity: 1 }}
      exit={{ transform: "translateY(-10px)", opacity: 0 }}
    >
      <img src="/icons/bar/search-sm.svg" alt="" />
      <input
        className={stl.input}
        placeholder={placeholder}
        type="text"
        id="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </motion.label>
  );
}
