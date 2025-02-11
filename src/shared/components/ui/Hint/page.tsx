import { useRef, useState } from 'react'
import { HintDropdown } from './components/HintDropdown/page'
import stl from "./style.module.scss"

export function Hint({ children }: { children: string }) {
	const [isOpen, setIsOpen] = useState(false);
	const hintRef = useRef<HTMLDivElement>(null);

	function onClick() {
		setIsOpen(true);
	}

	return (
		<div ref={hintRef} className={stl.hint} onClick={onClick}>
			<img src="/icons/hint.svg" alt="" />
			<HintDropdown hintRef={hintRef} isOpen={isOpen} setIsOpen={setIsOpen}>
				{children}
			</HintDropdown>
		</div>
	);
}