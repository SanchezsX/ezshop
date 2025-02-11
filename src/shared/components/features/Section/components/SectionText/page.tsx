import { cn } from '@/shared/helpers'
import { ReactNode } from 'react'
import stl from "./style.module.scss"

interface SectionTextProps {
  children: ReactNode;
  className?: string;
}

export function SectionText({ children, className = "" }: SectionTextProps) {
  return (
    <div className={cn(stl.text, className)}>
      {children}
    </div>
  );
}