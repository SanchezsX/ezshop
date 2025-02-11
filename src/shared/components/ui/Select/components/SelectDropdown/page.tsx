import { useOnClickOutside } from '@/shared/hooks'
import { useBoundingClientRect } from '@/shared/hooks/useBoundingClientRect'
import { AnimatePresence, motion } from 'motion/react'
import { useContext, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { SelectContext } from '../../page'
import stl from "./style.module.scss"



export function SelectDropdown({ children }: { children: ReactNode }) {
	const { selectRef, isOpen, setIsOpen } = useContext(SelectContext);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const { position } = useBoundingClientRect(selectRef);
	
	useOnClickOutside({
		refs: [dropdownRef, selectRef],
		callback: () => setIsOpen(false)
	})

	return createPortal((
		<AnimatePresence>
			{isOpen && (
				<motion.div
					ref={dropdownRef}
					className={stl.dropdown}
					style={{
						top: position.top + 55,
						left: position.left
					}}
					initial={{
						opacity: 0,
						transform: "translateY(-10px)",
						scale: .95
					}}
					animate={{
						opacity: 1,
						transform: "translateY(0px)",
						scale: 1
					}}
					exit={{
						opacity: 0,
						transform: "translateY(-10px)",
						scale: .95
					}}
					transition={{
						transition: .2,
						ease: "easeInOut"
					}}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	), document.body)
}