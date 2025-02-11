import { RefObject, useEffect } from 'react'

interface useOnClickOutsideParams {
	refs: RefObject<any>[];
	callback: () => void;
}

export function useOnClickOutside({ refs, callback }: useOnClickOutsideParams) {
	function onClickOutside(e: MouseEvent) {
		const notContainTarget = refs.every(ref => (
			ref.current && ref.current !== e.target
		))

		if (notContainTarget) {
			callback();
		}
	}
	
	useEffect(() => {
		document.addEventListener("click", onClickOutside);

		return () => document.removeEventListener("click", onClickOutside)
	}, [])
}