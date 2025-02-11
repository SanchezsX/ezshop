import { ReactNode } from 'react'
import stl from "./style.module.scss"

export function SectionItem({ children }: { children: ReactNode }) {
	return (
		<div className={stl.item}>
			{children}
		</div>
	);
}