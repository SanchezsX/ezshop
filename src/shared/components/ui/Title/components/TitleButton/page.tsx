import { cn } from '@/shared/helpers'
import { Dispatch, SetStateAction } from 'react'
import stl from "./style.module.scss"

interface TitleButtonProps {
	src: string;
	state: [boolean, Dispatch<SetStateAction<boolean>>]
}

export function TitleButton({ src, state, ...props }: TitleButtonProps) {
	const [isSelect, setIsSelect] = state
	return (
		<button 
			className={cn(stl.button, isSelect ? stl.active : "")} 
			onClick={() => setIsSelect(!isSelect)}
			{...props}
		>
			<img src={src} alt="" />
		</button>
	);
}