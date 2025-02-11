import { ReactNode } from 'react'
import stl from "./style.module.scss"

export function ModalAction({ children }: { children: ReactNode }) {
	return (
		<div className={stl.action} >
			{children}
		</div>
	);
}