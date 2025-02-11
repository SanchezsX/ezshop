import { ReactNode, useContext } from 'react'
import { CardContext } from '../../page'

export function CardHidden({ children }: { children: ReactNode }) {
	const { hiddenRef } = useContext(CardContext)

	return(
		<div ref={hiddenRef}>
			{children}
		</div>
	);
}