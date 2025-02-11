import { motion } from 'motion/react'
import { useLayoutEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import stl from "./style.module.scss"

export function ActionArea({ children }: { children: ReactNode }) {
	useLayoutEffect(() => {
		document.body.style.marginBottom = "62px"

		return () => {
			document.body.style.marginBottom = "0px"
		}
	}, [])
	
	return createPortal((
		<motion.div
			 className={stl.wrapper}
			 initial={{ opacity: 0 }}
			 animate={{ opacity: 1 }}
			 exit={{ opacity: 0 }}	 
		>
			{children}
		</motion.div>
	), document.body);
}