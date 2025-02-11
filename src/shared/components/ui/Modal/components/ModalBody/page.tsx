import { HTMLAttributes, ReactNode } from 'react'

interface ModalActionProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

export function ModalBody({ children, ...props }: ModalActionProps) {
	return (
		<div {...props}>
			{children}
		</div>
	);
}