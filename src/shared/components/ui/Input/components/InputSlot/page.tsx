import type { ReactNode } from 'react'
import stl from "./style.module.scss"
export function InputSlot({ children }: { children: ReactNode }) {
	return (
		<div className={stl.slot}>
			{children}
		</div>
	);
}