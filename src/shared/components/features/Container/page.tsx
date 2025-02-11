import { ReactNode } from 'react'
import stl from "./style.module.scss"

export function Container({ children }: { children: ReactNode }) {
	return (
		<div className={stl.container}>
			{children}
		</div>
	);
}