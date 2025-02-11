import { Story as IStory } from '@/shared/models/story'
import { useState } from 'react'
import { StoryItem } from './components/StoryItem/page'
import { StoryView } from './components/StoryView/page'
import stl from "./style.module.scss"

export function Story({ data }: { data: IStory[] }) {
	const stateOpen = useState(false);
	const [currentStory, setCurrentStory] = useState({} as IStory)

	function onView(data: IStory) {
		setCurrentStory(data);
		stateOpen[1](true);
		document.body.style.overflow = "hidden";
	}

	return (
		<>
			<div className={stl.wrapper}>
				{data.map(data => (
					<StoryItem 
						key={data.id} 
						data={data} 
						onClick={onView} 
					/>
				))}
			</div>
			<StoryView 
				state={stateOpen} 
				content={currentStory.content} 
				link={currentStory.link} 
			/>
		</>
	);
}