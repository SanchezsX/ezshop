import { cn } from '@/shared/helpers'
import { ReactNode } from 'react'
import stl from "./style.module.scss"

interface CardHiddenProps {
	children: ReactNode;
	className?: string;
}

export function CardItem({ children, className = "" }: CardHiddenProps) {
	return(
		<div className={cn(stl.card, className)}>
			{children}
		</div>
	);
}