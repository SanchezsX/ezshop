import { AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { TitleFilterView } from './components/TitleFilterView/page'
import stl from "./style.module.scss"

export function TitleFilter() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button className={stl.button} onClick={() => setIsOpen(true)}>
				<img src="/icons/bar/filter.svg" alt="" />
			</button>
			<AnimatePresence>
				{isOpen && (
					<TitleFilterView setIsOpen={setIsOpen} />
				)}
			</AnimatePresence>
		</>
	);
}