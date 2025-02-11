import { ReactNode } from "react";
import { Link } from "react-router";
import stl from "./style.module.scss";
import { cn } from "@/shared/helpers";

interface SectionLinkProps {
  children: ReactNode;
  href: string;
  soon?: boolean;
}

export function SectionLink({
  children,
  href,
  soon = false,
}: SectionLinkProps) {
  return (
    <Link className={cn(stl.link, soon ? stl.disabled : "")} to={href}>
      {children}
      {soon ? (
        <div className={stl.soon}>Скоро</div>
      ) : (
        <img className={stl.link_icon} src="/icons/arrow-right.svg" alt="" />
      )}
    </Link>
  );
}
