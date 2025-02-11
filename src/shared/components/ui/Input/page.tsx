import { cn } from '@/shared/helpers'
import { forwardRef, InputHTMLAttributes, ReactNode, useState } from 'react'
import { InputSlot } from './components/InputSlot/page'
import stl from "./style.module.scss"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	children?: ReactNode;
	id: string;
	error?: string;
}

export const InputBase = forwardRef<HTMLInputElement, InputProps>(({ 
	children, 
	id, 
	placeholder, 
	error,
	required,
	...props 
}, ref) => {
	const [isFocus, setIsFocus] = useState(false);

	return (
		<div className={stl.wrapper}>
			<div 
				className={cn(stl.input, isFocus ? stl.active : "")} 
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
			>
				<input ref={ref} id={id} placeholder="" required={required} {...props} />
				<label htmlFor={id}>
					
				</label>
				<p className={stl.input_placeholder}>
					{placeholder}
					{required && <span>*</span>}
				</p>
				{children}
			</div>
			{error && <p className={stl.error}>{error}</p>}
		</div>
	);
})

export const Input = Object.assign(InputBase, { Slot: InputSlot });