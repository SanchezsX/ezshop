import stl from "./style.module.scss";
import { cn } from "@/shared/helpers";

interface InfoBlockProps {
  src: string;
  title: string;
  subtitle: string;
  mt?: string;
  ownImage?: boolean;
}

export function InfoBlock({
  src,
  title,
  subtitle,
  mt = "40px",
  ownImage = false,
}: InfoBlockProps) {
  return (
    <div
      className={cn(stl.block, ownImage ? stl.own : "")}
      style={{ marginTop: mt }}
    >
      <img src={src} alt="" />
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}
