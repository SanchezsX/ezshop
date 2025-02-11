import { cn } from '@/shared/helpers'
import { useContext } from 'react'
import { TabContext } from '../../page'
import stl from "./style.module.scss"

interface TabItemProps {
	children: string;
	name: string;
}

export function TabItem({ children, name }: TabItemProps) {
	const { select, setSelect } = useContext(TabContext);
	const activeCond = select === name ? stl.active : "";
	
	return (
		<button 
			className={cn(stl.item, activeCond)}
			onClick={() => setSelect(name)}
		>
			{children}
		</button>
	);
}