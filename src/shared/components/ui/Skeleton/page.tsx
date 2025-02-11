import stl from "./style.module.scss"

interface SkeletonProps {
	width: string;
	height: string;
}

export function Skeleton({ width, height }: SkeletonProps) {
	return (
		<div 
			className={stl.skeleton}
			style={{ width, height }}
		></div>
	);
}