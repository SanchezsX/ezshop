import { useOnClickOutside } from '@/shared/hooks'
import { useBoundingClientRect } from '@/shared/hooks/useBoundingClientRect'
import { AnimatePresence, motion } from 'motion/react'
import { Dispatch, RefObject, SetStateAction, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import stl from "./style.module.scss"

interface HintDropdownProps {
	children: string;
	hintRef: RefObject<HTMLDivElement>;
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function HintDropdown({ 
	children, 
	hintRef, 
	isOpen, 
	setIsOpen 
}: HintDropdownProps) {
	const dropdownRef = useRef<HTMLDivElement>(null)
	const { position } = useBoundingClientRect(hintRef);
	const [specPos, setSpecPos] = useState({
		top: 0,
		left: 0
	})

	function getSpecPoc() {
		if (dropdownRef.current) {
			const top = position.top - (dropdownRef.current && dropdownRef.current.offsetHeight || 0) - 5;
			const left = position.left - (dropdownRef.current && dropdownRef.current.offsetWidth || 0) + 18;

			setSpecPos({ top, left })
		}
	}

	useLayoutEffect(() => {
		getSpecPoc()
	}, [isOpen, dropdownRef.current])

	useOnClickOutside({
		refs: [hintRef],
		callback: () => {
			setIsOpen(false);
		}
	})

	return createPortal((
		<AnimatePresence>
			{isOpen && (
				<motion.div
					ref={dropdownRef}
					className={stl.dropdown}
					style={{
						top: specPos.top,
						left: specPos.left 
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
	), document.body);
}