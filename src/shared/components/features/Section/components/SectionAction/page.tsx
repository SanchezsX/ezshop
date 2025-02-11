import type { ReactNode } from 'react'
import stl from "./style.module.scss"

export function SectionAction({ children }: { children: ReactNode }) {
	return (
		<div className={stl.action}>
			{children}
		</div>
	);
}