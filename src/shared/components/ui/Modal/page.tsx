import { useOnClickOutside } from '@/shared/hooks'
import { createContext, Dispatch, MutableRefObject, ReactNode, SetStateAction, useRef } from 'react'
import { ModalAction } from './components/ModalAction/page'
import { ModalBody } from './components/ModalBody/page'
import { ModalRoot } from './components/ModalRoot/page'
import { ModalTrigger } from './components/ModalTrigger/page'

interface ModalProps {
	children: ReactNode;
	openState: [boolean, Dispatch<SetStateAction<boolean>>];
}

type ModalContextValue =  {
	triggerRef: MutableRefObject<HTMLDivElement | null>;
	modalRef: MutableRefObject<HTMLDivElement | null>;
	openState: [boolean, Dispatch<SetStateAction<boolean>>];
};

export const ModalContext = createContext({} as ModalContextValue);

function ModalBase({ children,  openState }: ModalProps) {
	const modalRef = useRef<HTMLDivElement | null>(null);
	const triggerRef = useRef<HTMLDivElement | null>(null);

	useOnClickOutside({ 
		refs: [modalRef, triggerRef],
		callback: () => openState[1](false)
	})
	
	return (
		<ModalContext.Provider value={{ modalRef, triggerRef, openState }}>
			{children}
		</ModalContext.Provider>
	)
}

export const Modal = Object.assign(ModalBase, {
	Root: ModalRoot,
	Body: ModalBody,
	Action: ModalAction,
	Trigger: ModalTrigger
})