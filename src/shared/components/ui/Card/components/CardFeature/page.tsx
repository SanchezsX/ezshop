import stl from "./style.module.scss"

interface CardFeatureProps {
	value: string;
	name: string;
}

export function CardFeature({ value, name }: CardFeatureProps) {
	return(
		<div className={stl.feature}>
			<h4>{value}</h4>
			<p>{name}</p>
		</div>
	);
}