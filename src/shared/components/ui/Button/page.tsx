import { cn } from '@/shared/helpers'
import type { ButtonHTMLAttributes } from 'react'
import stl from "./style.module.scss"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: string;
	variant?: "primary" | "danger";
}

export function Button({
	children,
	className = "",
	variant = "primary",
	...props
}: ButtonProps) {
	const currentVariant = {
		primary: stl.primary,
		danger: stl.danger
	}[variant]

	return (
		<button 
			className={cn(stl.button, currentVariant,  className)} 
			{...props}
		>
			{children}
		</button>
	);
}