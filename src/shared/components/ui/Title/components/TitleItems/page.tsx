import { ReactNode } from 'react'
import stl from "./style.module.scss"

export function TitleItems({ children }: { children: ReactNode }) {
	return (
		<div className={stl.wrapper}>
			{children}
		</div>
	);
}