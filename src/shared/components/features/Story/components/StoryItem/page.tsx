import type { Story } from '@/shared/models/story'
import stl from "./style.module.scss"

interface StoryItemProps {
	data: Story;
	onClick: (data: Story) => void;
}

export function StoryItem({ data, onClick }: StoryItemProps) {
	const { accent, src, title } = data;
	
	return (
		<div className={stl.history}>
			<button 
				className={stl.history_circle}
				style={{
					backgroundColor: accent,
					outlineColor: accent
				}}
				onClick={() => onClick(data)}
			>
				<img src={src} alt="" />
			</button>
			<p className={stl.history_title}>
				{title}
			</p>
		</div>
	);
}