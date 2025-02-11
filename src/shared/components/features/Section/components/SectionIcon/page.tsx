import stl from "./style.module.scss"

export function SectionIcon({ src }: { src: string }) {
	return (
		<img className={stl.icon} src={src} alt="" />
	);
}