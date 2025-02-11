import { ReactNode } from 'react'
import stl from "./style.module.scss"

export function TitleText({ children }: { children: ReactNode }) {
	return (
		<h1 className={stl.title}>
			{children}
		</h1>
	);
}