import { RefObject, useLayoutEffect, useState } from 'react'

type BoundingClientPosition = {
	bottom: number;
	left: number;
	right: number;
	top: number;
	x: number;
	y: number;
}

type BoundingClientSize = {
	height: number;
	width: number;
}

export function useBoundingClientRect(ref: RefObject<any>) {
	const [position, setPosition] = useState({} as BoundingClientPosition)
	const [size, setSize] = useState({} as BoundingClientSize)

	useLayoutEffect(() => {
		if (ref.current) {
			const rect = ref.current.getBoundingClientRect()
			
			setPosition({
				x: rect.x,
				y: rect.y,
				top: rect.top,
				left: rect.left,
				right: rect.right,
				bottom: rect.bottom
			})

			setSize({ 
				width: rect.width, 
				height: rect.height
			 })
		}
	}, [ref.current])

	return { position, size };
}