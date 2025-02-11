import { Button } from '@/shared/components/ui'
import { PromoChannel } from '@/shared/components/ui/PromoChannel/page'
import { AnimatePresence, motion } from 'motion/react'
import { createPortal } from 'react-dom'
import stl from "./style.module.scss"

interface StoryViewProps {
	state: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
	content: string;
	link: string;
}

export function StoryView({
	state,
	content, 
	link 
}: StoryViewProps) {
	const [isOpen, setIsOpen] = state;

	function toLink() {
		window.open(link, "_blank");
	}

	function onClose() {
		setIsOpen(false);
		content = ""
		link = ""
		document.body.style.overflow = "auto";
	}

	return createPortal(
		<AnimatePresence>
			{isOpen && (
				<motion.div
					 className={stl.view}
					 initial={{
						opacity: 0,
						scale: .6,
					 }}
					 animate={{
						opacity: 1,
						scale: 1,
					 }}
					 exit={{
						opacity: 0,
						scale: .6,
					 }}
					 transition={{
						duration: 0.2,
						ease: "easeInOut"
					 }}
					>
					<header className={stl.view_header}>
						<PromoChannel />
						<button onClick={onClose}>
							<img src="/icons/close.svg" alt="" />
						</button>
					</header>
					<img className={stl.view_content} src={content} alt="" />
					<Button 
						className={stl.view_button} 
						onClick={toLink}
					>
						Перейти в канал
					</Button>
				</motion.div>
			)}
		</AnimatePresence>,
		document.body
	)
}